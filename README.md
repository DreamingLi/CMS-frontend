# Forum management system

This background system was developed for the content management of forum articles. At present, the functions of the article part (such as article list, article content modification, export to Excel) have been completed.

Currently the backend is a mock server. 
It will randomly generate data and then return. So when testing, it is normal if the data is different from the previous data
![Listimg](https://github.com/DreamingLi/CMS-frontend/blob/main/img/List.PNG)
![Editimg](https://github.com/DreamingLi/CMS-frontend/blob/main/img/Edit.PNG)
## Run Project
clone the project
`git clone https://github.com/DreamingLi/CMS-frontend`

install all packages the project needs
`npm i`

run the project
`npm run start`
## 绘制流程图 Flowchart
### ===Article===
```flow
st=>start: access the List page
getArticleList=>operation: Send requirements for getting articles
getArticleListCond=>condition: Get articles?
failedGetArticle=>operation: Display error messages
SuccGetArticle=>operation: Display articles
editArticleCond=>condition: Edit?
sendEdit=>operation: Send the article Id Back to the server
deleteArticleCond=>condition: Delete?
popOutConfirm=>operation: Pop out window confirm
ifDelete=>condition: Confirm?
windowConfirmDisappear=>operation: window confirm disappear
deleteArticle=>operation: Send the requirement for delete
deleteBntState=>operation: Change the confirm button to the loading state
receivedArticleCond=>condition: Deleted?
renderArticleList=>operation: Render the Article list again
errMsg=>operation: Pop up an error message
windowDisappear=>operation: Change the button to normal state and confirm window disappear
resendList=>operation: Resend the requirement for new list data
displayEditPage=>operation: Display article edit page according to the article id
saveArticleCond=>condition: Save?
sendNewContent=>operation: Send the ariticle info to the server
backToList=>operation: Go back to the article list
succSaved=>condition: Saved?
popOutSaved=>operation: Pop up message that successfully saved
popOutFailed=>operation: Pop up message that failed to save
e=>end: End

st->getArticleList->getArticleListCond
getArticleListCond(yes)->SuccGetArticle->editArticleCond
getArticleListCond(no)->failedGetArticle
editArticleCond(yes)->sendEdit->displayEditPage->saveArticleCond
editArticleCond(no)->deleteArticleCond
deleteArticleCond(yes)->popOutConfirm->ifDelete
deleteArticleCond(no)->e
ifDelete(yes)->deleteArticle->deleteBntState->receivedArticleCond
ifDelete(no)->windowConfirmDisappear
receivedArticleCond(yes)->windowDisappear->resendList->renderArticleList->e
receivedArticleCond(no)->errMsg
saveArticleCond(yes)->sendNewContent->succSaved
saveArticleCond(no)->backToList
succSaved(yes)->popOutSaved->e
succSaved(no)->popOutFailed
```
### End