//データの定義
const QuizData = [
    {
      question:"中国語で「勉強」の意味は？",
      answers:["喧嘩っ早い","無理やり","細かい","意地悪な"],
      correct:"無理やり",
    },
    {
      question:"お酢に卵を殻ごといれると卵はどうなるでしょう？",
      answers:["透明な卵になる","鏡のようになんでもうつる卵になる","卵が溶けてなくなる","卵が石のように堅くなる"],
      correct:"透明な卵になる",
    },
    {
        question:"しゃっくりはある調味料をなめると止まります。ある調味料とはなんでしょう？",
        answers:["お酢","砂糖","醤油","塩"],
        correct:"砂糖",
      },
      {
        question:"甘くて美味しい羊羹ですが、羊羹はもともとあるものを煮込んだスープのことでした。あるスープとはなんでしょう？",
        answers:["牛の血","牛乳","羊の肉","馬の肉"],
        correct:"羊の肉",
      },
      {
        question:"おぼうさんが木魚をたたく意味はなんでしょう？",
        answers:["お経にリズムをつけるため","亡くなった人が天国にいけるようにと祈るため","眠くならないようにするため","悪い霊を寄せ付けないため"],
        correct:"眠くならないようにするため",
      },
      {
        question:"「アホウドリ」の名前の由来はなんでしょう？",
        answers:["アホーと鳴くから","人間にすぐつかまるから","アホみたいな顔をしているから","阿波踊りみたいに踊っているように飛ぶから"],
        correct:"人間にすぐつかまるから",
      },
      {
        question:"氷が長持ちする作り方はなんでしょう？",
        answers:["塩をいれた水で氷を作る","沸騰したお湯をいれて氷を作る","砂糖をいれた水で氷を作る","お酢をいれた水で氷りを作る"],
        correct:"沸騰したお湯をいれて氷を作る",
      },
      {
        question:"有名な作曲家「ベートーベン」の癖はなんだったでしょう？",
        answers:["目をパチパチさせる","爪をかじる","念入りに手を洗う","くしゃみをしたあとに、「大魔王」という"],
        correct:"念入りに手を洗う",
      },
      {
        question:"ドジョウは人間と同じようにあることをします。あることとはどれでしょう？",
        answers:["あくび","おなら","まばたき","くしゃみ"],
        correct:"おなら",
      },
      {
        question:"豚のくるくる巻いてあるしっぽが、あるときは伸びてまっすぐになります。あるときとは、いつでしょう？",
        answers:["走っている時","ご飯を食べている時","眠っている時","おしっこをしている時"],
        correct:"眠っている時",
      },
    
    ];
    // {
    //     question:"",
    //     answers:["","","",""],
    //     correct:"",
    //   },
    
    
    //元データを複製
    let DataCopy = QuizData.map((option)=>{
      return option;
    });
    
    
    //使用する変変数を定義
    let quizIndex = 0;
    let quiz_num = 1;
    let click_count = 0;
    let correct_count = 0;
    let wrong_count = 0;
    const Result = document.getElementById('result');
    const quizlength = DataCopy.length;
    const correct_menu = document.getElementById('correct_menu');
    const wrong_menu = document.getElementById('wrong_menu');
 
    
    //問題・選択肢をシャッフル
    DataCopy.sort(()=>{
      return Math.random() -0.5;
    });
    
    
    for(let i= 0;i<quizlength;i++){
      DataCopy[i].answers.sort(()=>{
        return Math.random() -0.5;
      })
    }
    //問題文と答えと問題番号を定義
    function setQuiz (){
        const nums = document.getElementById('number');
        nums.textContent = `第${quiz_num}問`;
        document.getElementById('question').textContent = DataCopy[quizIndex].question;

        for (let i =0;i < DataCopy[quizIndex].answers.length;i++){
          const cons = document.querySelectorAll('.list')[i];
          cons.textContent = DataCopy[quizIndex].answers[i];
    }}
    setQuiz();
    
    //サウンドを再生する
    function sound(type){
        let Audio;
        if(type){
          Audio = document.getElementById('correct_sound');
        }else{
          Audio = document.getElementById('wrong_sound');
        }
        Audio.currentTime = 0;
        Audio.play();
    }
    
    
    //正誤判定システム
    const clickcheck =(e)=>{
        if(click_count === quiz_num){
            return;
        }
        click_count++;
        if(e.target.textContent === DataCopy[quizIndex].correct){
          correct_count++;
          correct_menu.classList.add('menu_show');
          sound(true);
        
        }else{
          wrong_count ++;
          wrong_menu.classList.add('menu_show');
          sound(false);

    }
    }
    
    //正誤メニューボタン実装
    const menubtn = document.querySelectorAll('.menu_btn');
    menubtn.forEach(function(value){
      value.addEventListener('click',function(){ 
        value.parentNode.classList.remove('menu_show');
        CreateNode();
        quizIndex++;
        quiz_num++; 
        if(quizIndex < quizlength){
          setQuiz();
        }else{
           document.getElementById('replay_menu').classList.add('menu_show');
           if(correct_count === 0){
             Result.textContent = `全問不正解...`;
             Result.style.color = 'blue';
           
           }else if(correct_count === quizlength){
             Result.textContent = `全問正解！`;
             Result.style.color = 'red';
           
           }else{
             Result.textContent = `${correct_count}問正解！`;
           }
           }

});});
    //最終結果の詳細を生成
    function CreateNode(){
        let NewNode = document.createElement('p');
        NewNode.textContent = `${quiz_num} : ${DataCopy[quizIndex].question}... ${DataCopy[quizIndex].correct}`;
        let place = document.getElementById('result_detail');
        place.appendChild(NewNode);
      }

    //正誤判定実行
    for(let i=0;i<4;i++){
      document.querySelectorAll('.list')[i].addEventListener('click',(e)=>{
        clickcheck(e);
      },false);
    }
    
    //リプレイボタン実装
    const reload =document.getElementById('replay_btn');
      reload.addEventListener('click',function(){
        window.location.reload();
    });
    
    //結果のアニメーション
    function Animate(){
      Result.classList.toggle('right-animate');
      setTimeout(Animate2,200);
      }
    function Animate2(){
      Result.classList.toggle('left-animate');
      setTimeout(Animate,200);
      }
    Animate();


    
    
    