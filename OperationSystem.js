// حداکثر ظرفیت بافر را از کاربر می گیرم
//تبدیل تایپ انجام میدم که اگر عدد عدد اعشاری وارد کرده بود بشه عدد صحیح
const count = parseInt(
  prompt(
    "لطفا اندازه بافر خود را با تایپ عدد مورد نظر (الزاما به زبان انگلیسی) وارد کنید."
  )
);

//بافر خالی است-نوع بافر آرایه هست
let queue = [];

//مقادیر را ست کردم
let semaphores = {
  // تعداد داده‌های موجود در بافر
  n: 0,
  // تعداد سلول‌های خالی در بافر
  s: count,
};

function semWait(sem) {
  const check = () => {
    if (semaphores[sem] > 0) {
      // ظرفیت را کاهش می‌ده
      semaphores[sem]--;
    } else {
      setTimeout(check, 5);
    }
  };
  check();
}

function semSignal(sem) {
  semaphores[sem]++;
}

// تابع تولیدکننده
function producer() {
  setInterval(() => {
    const item = Math.floor(Math.random() * 10) + 1; // تولید داده تصادفی
    // انتظار برای فضای خالی در بافر
    semWait("s");
    // وارد کردن داده به بافر (در صورتی که فضا در بافر وجود داشته باشد)
    if (queue.length < count) {
      //به بافر عنصر را اضافه می کنم
      queue.push(item);
      console.log(`Producer produced: ${item} | Buffer [${queue.join(", ")}]`);
      // اعلام اضافه شدن داده به بافر
      semSignal("n");
    }
  }, 500); // تولید  هر 500 میلی‌ثانیه
}

// تابع مصرف‌کننده
function consumer() {
  setInterval(() => {
    // انتظار برای وجود داده در بافر
    semWait("n");
    // مصرف داده از بافر
    //در انجا فرض کردم داده را از اول آرایه بر میداره می توانستم جور دیگری هم فرض کنم اگر به جای کلمه ی شیفت از کلمه ای مثل پاپ استفاده می کردم
    const item = queue.shift();
    console.log(`Consumer consumed: ${item} | Buffer [${queue.join(", ")}]`);
    // اعلام مصرف داده
    semSignal("s");
  }, 600); // مصرف  هر 600 میلی‌ثانیه
}

// تابع ها را فراخوانی کردم تا اجرا بشن
//تولید کننده و مصرف کننده به صورت هزمان شزوع به کار می کنند
producer();
consumer();
