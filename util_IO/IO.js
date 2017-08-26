//TODO onehotencoding
//TODO non-image formats
//TODO folders

function splitNoFolder() {
	console.log("splitNoFolder")
	var folderName = document.getElementById('folder_name').value
	var splitRate = document.getElementById('split_rate').value			
	var root = "./"+folderName+"/"
	var labelName = document.getElementById('label_name').value
	var fileExt = document.getElementById('file_ext').value
	keras_imports = //import code
		`
import numpy as np
from PIL import Image
from sklearn.model_selection import train_test_split
		`
	keras_code = //code				
"root = " + "\"" + root + "\"" + "\n" +
"label = " + "\"" + labelName + "\"" + "\n" +
"ext = " + "\"" + fileExt + "\"" + "\n" +
"test_split_rate = " + splitRate + "\n" +
		`
ctr = 0 
dimen = False
with open(root+label, 'r') as label_index:
	for line in label_index:
		ctr+=1
		if(dimen==False):
			img = Image.open(root+line.split(" ")[0])
			dimen = np.array(img).shape

X = np.zeros(( (ctr,)+ dimen))
y = np.zeros((ctr))
print(X.shape,y.shape)

with open(root+label, 'r') as label_index:
	for idx, line in enumerate(label_index):
		lineinfo = line.split(" ")
		img = Image.open(root+line.split(" ")[0])
		X[idx] = np.array(img)
		y[idx] = lineinfo[1]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = test_split_rate)
print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)
		`
	console.log(keras_imports + "\n" + keras_code)
}

function splitFolder() {
	console.log("splitFolder")
	var folderName = document.getElementById('folder_name').value
	var splitRate = document.getElementById('split_rate').value			
	var root = "./"+folderName+"/"
	var labelName = document.getElementById('label_name').value
	var fileExt = document.getElementById('file_ext').value
	keras_imports = //import code
		`
import os
import numpy as np
from PIL import Image
from sklearn.model_selection import train_test_split
		`
	keras_code = //code				
"root = " + "\"" + root + "\"" + "\n" +
"label = " + "\"" + labelName + "\"" + "\n" +
"ext = " + "\"" + fileExt + "\"" + "\n" +
"test_split_rate = " + splitRate + "\n" +
		`
ctr = 0 
dimen = False
with open(root+label, 'r') as label_index:
	for line in label_index:
		path = os.path.join(root,line.split(" ")[0])
		_,_,files = next(os.walk(path))
		ctr+=len(files)
		if(dimen==False):
			img = Image.open(os.path.join(path,files[0]))
			dimen = np.array(img).shape

X = np.zeros(( (ctr,)+ dimen))
y = np.zeros((ctr))
print(X.shape,y.shape)

idx = 0
with open(root+label, 'r') as label_index:
	for line in label_index:
		lineinfo = line.split(" ")
		path = os.path.join(root,lineinfo[0])
		_,_,files = next(os.walk(path))
		for filename in files:
			img = Image.open(os.path.join(path,filename))
			X[idx] = np.array(img)
			y[idx] = lineinfo[1]
			idx+=1

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = test_split_rate)
print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)
		`
	console.log(keras_imports + "\n" + keras_code)
}

function noSplitNoFolder() {
	console.log("noSplitNoFolder")
	var trainName = document.getElementById('train_name').value
	var testName = document.getElementById('test_name').value

	var trainRoot = "./"+trainName+"/"
	var testRoot = "./"+testName+"/"

	var labelName = document.getElementById('label_name').value
	var fileExt = document.getElementById('file_ext').value
	keras_imports = //import code
		`
import numpy as np
from PIL import Image
		`
	keras_code = //code				
"testRoot = " + "\"" + trainRoot + "\"" + "\n" +
"trainRoot = " + "\"" + testRoot +  "\"" + "\n" +
"label = " + "\"" + labelName + "\"" + "\n" +
"ext = " + "\"" + fileExt + "\"" + "\n" +
		`
ctr = 0 
dimen = False
with open(trainRoot+label, 'r') as label_index:
	for line in label_index:
		ctr+=1
		if(dimen==False):
			img = Image.open(trainRoot+line.split(" ")[0])
			dimen = np.array(img).shape

X_train = np.zeros(( (ctr,)+ dimen))
y_train = np.zeros((ctr))

with open(trainRoot+label, 'r') as label_index:
	for idx, line in enumerate(label_index):
		lineinfo = line.split(" ")
		img = Image.open(trainRoot+line.split(" ")[0])
		X_train[idx] = np.array(img)
		y_train[idx] = lineinfo[1]

ctr = 0 
dimen = False
with open(testRoot+label, 'r') as label_index:
	for line in label_index:
		ctr+=1
		if(dimen==False):
			img = Image.open(testRoot+line.split(" ")[0])
			dimen = np.array(img).shape

X_test = np.zeros(( (ctr,)+ dimen))
y_test = np.zeros((ctr))

with open(testRoot+label, 'r') as label_index:
	for idx, line in enumerate(label_index):
		lineinfo = line.split(" ")
		img = Image.open(testRoot+line.split(" ")[0])
		X_test[idx] = np.array(img)
		y_test[idx] = lineinfo[1]

print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)
		`
	console.log(keras_imports + "\n" + keras_code)
}

function noSplitFolder() {
	console.log("noSplitFolder")
	var trainName = document.getElementById('train_name').value
	var testName = document.getElementById('test_name').value

	var trainRoot = "./"+trainName+"/"
	var testRoot = "./"+testName+"/"

	var labelName = document.getElementById('label_name').value
	var fileExt = document.getElementById('file_ext').value
	keras_imports = //import code
		`
import os
import numpy as np
from PIL import Image
		`
	keras_code = //code				
"testRoot = " + "\"" + trainRoot + "\"" + "\n" +
"trainRoot = " + "\"" + testRoot +  "\"" + "\n" +
"label = " + "\"" + labelName + "\"" + "\n" +
"ext = " + "\"" + fileExt + "\"" + "\n" +
		`
ctr = 0 
dimen = False
with open(trainRoot+label, 'r') as label_index:
	for line in label_index:
		path = os.path.join(trainRoot,line.split(" ")[0])
		_,_,files = next(os.walk(path))
		ctr+=len(files)
		if(dimen==False):
			img = Image.open(os.path.join(path,files[0]))
			dimen = np.array(img).shape

X_train = np.zeros(( (ctr,)+ dimen))
y_train = np.zeros((ctr))
print(X_train.shape,y_train.shape)

idx = 0
with open(trainRoot+label, 'r') as label_index:
	for line in label_index:
		lineinfo = line.split(" ")
		path = os.path.join(trainRoot,lineinfo[0])
		_,_,files = next(os.walk(path))
		for filename in files:
			img = Image.open(os.path.join(path,filename))
			X_train[idx] = np.array(img)
			y_train[idx] = lineinfo[1]
			idx+=1

ctr = 0 
dimen = False
with open(testRoot+label, 'r') as label_index:
	for line in label_index:
		path = os.path.join(testRoot,line.split(" ")[0])
		_,_,files = next(os.walk(path))
		ctr+=len(files)
		if(dimen==False):
			img = Image.open(os.path.join(path,files[0]))
			dimen = np.array(img).shape

X_test = np.zeros(( (ctr,)+ dimen))
y_test = np.zeros((ctr))
print(X_test.shape,y_test.shape)

idx = 0
with open(testRoot+label, 'r') as label_index:
	for line in label_index:
		lineinfo = line.split(" ")
		path = os.path.join(testRoot,lineinfo[0])
		_,_,files = next(os.walk(path))
		for filename in files:
			img = Image.open(os.path.join(path,filename))
			X_test[idx] = np.array(img)
			y_test[idx] = lineinfo[1]
			idx+=1

print(X_train.shape,X_test.shape,y_train.shape,y_test.shape)
		`
	console.log(keras_imports + "\n" + keras_code)
}

function loadData() {
	var splitData = document.getElementById('split_data').value
	var useFolder = document.getElementById('use_folder').value
	if(splitData=="true" && useFolder=="true")
		splitFolder()
	else if(splitData=="true")
		splitNoFolder()
	else if(useFolder=="true")
		noSplitFolder()
	else
		noSplitNoFolder()
}