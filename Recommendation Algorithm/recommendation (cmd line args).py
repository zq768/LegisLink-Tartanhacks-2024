#recommendation algorithm for LegisLink
#template from this guide https://medium.com/@prateekgaurav/step-by-step-content-based-recommendation-system-823bbfd0541c

#Import all the required packages
import pandas as pd
import sys
from sklearn.metrics.pairwise import cosine_similarity

# Load the bills.csv file into a Pandas dataframe
bills = pd.read_csv('/Users/qing/desktop/projects/LegisLink/billdata2.csv')

privatebilllist = bills.copy()
privatebilllist['Title'] = bills['Title'].str.lower() #for easier searching, lowercase version

# Extract the movie titles and tags into separate lists
titles = bills['Title'].tolist()
tags = bills['Tags'].str.split("|").tolist()

# Create a bag of words representation of the movie tags
def create_bow(tag_list):
    bow = {}
    for tag in tag_list:
        bow[tag] = 1
    return bow

# Create a list of bags of words representations of the movie tags
bags_of_words = [create_bow(movie_tags) for movie_tags in tags]

# Create a dataframe to store the bags of words representation of the movie tags
tag_df = pd.DataFrame(bags_of_words, index=titles).fillna(0)

# Calculate the cosine similarity matrix between the bills
cosine_similarity = cosine_similarity(tag_df)

# Create a dataframe with the cosine similarity scores
similarity_df = pd.DataFrame(cosine_similarity, index=tag_df.index, columns=tag_df.index)

usersimilarities = pd.DataFrame(0, index=[0], columns=similarity_df.columns) #initialize preferences to all 0

#input_arg = sys.argv[1] if len(sys.argv) > 1 else '0'
input_index = 1
while input_index < len(sys.argv):
  uinput = sys.argv[input_index]
  counter = 1

  #ask the user for their preferences
  while uinput != '0':
    #print(uinput)
    # Find the index of the movie in the similarity dataframe
    try:
      movie_index = similarity_df.index.get_loc(uinput)
      counter += 1
      usersimilarities += similarity_df[movie_index:(movie_index+1)].reset_index(drop=True) #make sure indices align
    except KeyError:
      #want to look at tags instead
      similartags = privatebilllist.loc[privatebilllist['Tags'].str.contains(uinput.lower(), case=False)].index.tolist()
      for x in privatebilllist.loc[privatebilllist['Title'].str.contains(uinput.lower(), case=False)].index.tolist():
        if x not in similartags:
          similartags.append(x) #add any keywords in title also

      for y in range(len(similartags)):
        usersimilarities += similarity_df[(similartags[y]):(similartags[y]+1)].reset_index(drop=True)
        counter += 1

    input_index += 1
    uinput = sys.argv[input_index]
    

  input_index += 1

  #update similarity matrix with the usersimilarities 
  similarity_df = pd.concat([similarity_df, usersimilarities], ignore_index=False)

  #find closest similarities
  sims = similarity_df.iloc[len(similarity_df)-1].sort_values(ascending=False)


#finding the top 10
top_10 = []
counter = 0 #counter for sims index
upto10 = 0 #counter to 10
while upto10 != 10:
  index = bills[bills['Title'] == sims.index[0:][counter]].index[0]
  if bills["Level"][index] != -1:
    top_10.append(sims.index[0:][counter])
    upto10 += 1

  counter += 1

# Print the top 5 most similar bills to the movie
#print(f'\n\nRecommended Proposals:')
for x in range(len(top_10)):
#   print(str(x+1) + '.\t' + top_10[x] + '\t' + bills['Date'][x])
    print(' '.join(top_10[x].split()[:4]) + '...')


#delete usersimilarities off the dataset so similarity matrix is unchanged
similarity_df.drop(similarity_df.index[-1], inplace=True) 
