import numpy as np 
import pandas as pd 
import os
import pandas as pd
import numpy as np
import sys
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import f1_score, accuracy_score, confusion_matrix ,classification_report
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
data  = pd.read_csv(r"C:\Users\Desmond\Documents\GitHub\DecentraHealth\backend\controllers\dataset.csv")
data_sevrity = pd.read_csv(r"C:\Users\Desmond\Documents\GitHub\DecentraHealth\backend\controllers\Symptom-severity.csv")

data_dict = data_sevrity.set_index('Symptom').T.to_dict()

def remove_space_between_word(dataset):
    for col in dataset.columns:
        for i in range(len(dataset[col])):
            if (type(dataset[col][i]) == str ):
                dataset[col][i] = dataset[col][i].strip()
                dataset[col][i] = dataset[col][i].replace(" ", "_")
    return data

new_df = remove_space_between_word(data)
new_df.head()

def encode_data(dataset , data_dict_weigth):
    cols = dataset.columns
    for columnName in cols:
        for i in range(len(dataset[columnName])):
            try:
            #print(data_dict[data2[columnName][i]]["weight"])
                dataset[columnName][i] = data_dict[dataset[columnName][i]]["weight"]
            except:
                pass
    dataset = dataset.fillna(0) # put empty cell to 0
    dataset = dataset.replace("foul_smell_of_urine" , 5)
    dataset = dataset.replace("dischromic__patches" , 6)
    dataset = dataset.replace("spotting__urination" , 6)
    return dataset

df = encode_data(new_df , data_dict)
df.head()

#check if all Symptoms are replace by their weigth
names = []
for col in df.columns:
    if(col != "Disease"):
        for i in range(len(df[col])):
            if (type(df[col][i]) == str ):
                if df[col][i] not in names :
                    names.append(df[col][i])
                    

df_data = df.drop('Disease' , axis =1)
label = data["Disease"]
label


from scipy.stats import mode
x_train, x_test, y_train, y_test = train_test_split(df_data, label, shuffle=True, train_size = 0.70)
final_svm_model = SVC()
final_nb_model = GaussianNB()
final_rf_model = RandomForestClassifier(random_state=18)
final_svm_model.fit(x_train.values, y_train.values)
final_nb_model.fit(x_train.values, y_train.values)
final_rf_model.fit(x_train.values, y_train.values)
#svm_preds = final_svm_model.predict(x_test)
#nb_preds = final_nb_model.predict(x_test)
#rf_preds = final_rf_model.predict(x_test)
"""
 
print(f"Accuracy on Test dataset by the combined model\
: {accuracy_score(y_test, final_preds)*100}")
print(f"Accuracy on Test dataset by the svm model\
: {accuracy_score(y_test, svm_preds)*100}")
print(f"Accuracy on Test dataset by the naive bayes model\
: {accuracy_score(y_test, nb_preds)*100}")
print(f"Accuracy on Test dataset by the random forest model\
: {accuracy_score(y_test, rf_preds)*100}")"""

def SVM():
    psymptoms = sys.argv[1:]
    a = np.array(data_sevrity["Symptom"])
    b = np.array(data_sevrity["weight"])
    for j in range(len(psymptoms)):
        for k in range(len(a)):
            if psymptoms[j]==a[k]:
                psymptoms[j]=b[k]

    nulls = [0]*(17-len(psymptoms))
    psy = [psymptoms + nulls]

    svm_preds=final_svm_model.predict(psy)
    nb_preds=final_nb_model.predict(psy)
    rf_preds=final_rf_model.predict(psy)

    final_preds = [mode([i,j,k])[0][0] for i,j,
               k in zip(svm_preds, nb_preds, rf_preds)]
               
    print(final_preds[0])
SVM()


