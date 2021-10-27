# UniLabs Web :test_tube:
[![Netlify Status](https://api.netlify.com/api/v1/badges/d26a2a5b-7e8d-4e44-affa-190e1788e942/deploy-status)](https://app.netlify.com/sites/sharp-varahamihira-ae4057/deploys) [![codecov](https://codecov.io/gh/UniLabsIMS/UniLabs-Web/branch/main/graph/badge.svg?token=VLBEU1E63C)](https://codecov.io/gh/UniLabsIMS/UniLabs-Web)

This is the frontend web app for UniLabs Inventory Management System


## Setup Guide :raised_hands:

Make sure you have npm installed.

```bash
$ git clone https://github.com/UniLabsIMS/UniLabs-Web.git
$ cd UniLabs-Web
```

Intall dependencies

```bash
npm install
```

To run the app 

```bash
npm start
```



## Starting a New Feature :hammer_and_wrench:


Checkout main and pull changes

```bash
git checkout main
git pull
```

checkut to a new branch
```bash
git checkout -b feature/<feature_name>
```

install missing dependancies 

```bash
npm install
```
Start and run the app.

```bash
npm start
```

#### Merging the current branch to master :hammer_and_wrench:

Pull updates your local main branch
```bash
git checkout main
git checkout pull
```

Update the required branch

```bash
git checkout <your_branch>
git merge main
```

Start the app
```bash
npm install
```
