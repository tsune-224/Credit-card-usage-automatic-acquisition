function getMail() {

  // 抽出条件指定
  const query = 'label:クレカ '; //「クレカ」ラベル付き

 //メール取得、スレッド化
  const mailsThereads = GmailApp.search(query);
  const threads = GmailApp.getMessagesForThreads(mailsThereads);

  //ラベル取得
  const label = GmailApp.getUserLabelByName('クレカ');
  const archiveLabel = GmailApp.getUserLabelByName('クレカアーカイブ');

  let messages = [];

 //アーカイブラベル付与
  archiveLabel.addToThreads(mailsThereads);

  threads.forEach(thread => {
    thread.forEach(message => {
      messages.push(message.getPlainBody());
    })
  })

  for(let i = 0;i<messages.length;i++){
    notion(getDetailFromMail(messages[i]));
  }

  //「クレカ」ラベルをスレッドから削除
  label.removeFromThreads(mailsThereads);
}

function getDetailFromMail(plainBody){
  let date;
  let location;
  let price;

  //引数で受け取ったメール本文から各情報を抜く
  const splitedBody = plainBody.split(/\n/);
  date = splitedBody[7].substring(splitedBody[7].indexOf('：')+1);
  location = splitedBody[8].substring(splitedBody[8].indexOf('：')+1);
  price = splitedBody[10].substring(splitedBody[10].indexOf('：')+1,splitedBody[10].indexOf('円'));

  console.log('date:',date,'location:',location,'price:',price)

  return {date,location,price}
}
