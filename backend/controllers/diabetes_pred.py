import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
import sys

# Load the data
df = pd.read_csv('diabetes.csv')

# Split the data into training and testing sets
X = df.drop('Outcome', axis=1)
y = df['Outcome']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Preprocess the data
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train the logistic regression model with L2 regularization
clf = LogisticRegression(penalty='l2', C=1, random_state=42).fit(X_train, y_train)

# Evaluate the accuracy of the model
accuracy = clf.score(X_test, y_test)
print(f'Accuracy: {accuracy:.2f}')

# Make predictions on new data
patient_data=sys.argv[1:]
patient_data = [float(x) for x in patient_data]
#print(patient_data)
new_data = pd.DataFrame({'Pregnancies': [patient_data[0]], 'Glucose': [patient_data[1]], 'BloodPressure': [patient_data[2]], 'SkinThickness': [patient_data[3]], 'Insulin': [patient_data[4]], 'BMI': [patient_data[5]], 'DiabetesPedigreeFunction': [patient_data[6]], 'Age': [patient_data[7]]})
new_data = scaler.transform(new_data)
prediction = clf.predict_proba(new_data)[:,1]
print(f'Predicted probability of having diabetes: {prediction[0]*100:.2f}%')
