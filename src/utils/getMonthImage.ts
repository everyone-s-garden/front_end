import pc1 from 'assets/main/month/pc/1.png';
import pc2 from 'assets/main/month/pc/2.png';
import pc3 from 'assets/main/month/pc/3.png';
import pc4 from 'assets/main/month/pc/4.png';
import pc5 from 'assets/main/month/pc/5.png';
import pc6 from 'assets/main/month/pc/6.png';
import pc7 from 'assets/main/month/pc/7.png';
import pc8 from 'assets/main/month/pc/8.png';
import pc9 from 'assets/main/month/pc/9.png';
import pc10 from 'assets/main/month/pc/10.png';
import pc11 from 'assets/main/month/pc/11.png';
import pc12 from 'assets/main/month/pc/12.png';
import mobile1 from 'assets/main/month/mobile/1.png';
import mobile2 from 'assets/main/month/mobile/2.png';
import mobile3 from 'assets/main/month/mobile/3.png';
import mobile4 from 'assets/main/month/mobile/4.png';
import mobile5 from 'assets/main/month/mobile/5.png';
import mobile6 from 'assets/main/month/mobile/6.png';
import mobile7 from 'assets/main/month/mobile/7.png';
import mobile8 from 'assets/main/month/mobile/8.png';
import mobile9 from 'assets/main/month/mobile/9.png';
import mobile10 from 'assets/main/month/mobile/10.png';
import mobile11 from 'assets/main/month/mobile/11.png';
import mobile12 from 'assets/main/month/mobile/12.png';

interface MonthImages {
  pc: string;
  mobile: string;
}

const getMonthImage = (month: number): MonthImages => {
  switch (month) {
    case 1:
      return { pc: pc1, mobile: mobile1 };
    case 2:
      return { pc: pc2, mobile: mobile2 };
    case 3:
      return { pc: pc3, mobile: mobile3 };
    case 4:
      return { pc: pc4, mobile: mobile4 };
    case 5:
      return { pc: pc5, mobile: mobile5 };
    case 6:
      return { pc: pc6, mobile: mobile6 };
    case 7:
      return { pc: pc7, mobile: mobile7 };
    case 8:
      return { pc: pc8, mobile: mobile8 };
    case 9:
      return { pc: pc9, mobile: mobile9 };
    case 10:
      return { pc: pc10, mobile: mobile10 };
    case 11:
      return { pc: pc11, mobile: mobile11 };
    case 12:
      return { pc: pc12, mobile: mobile12 };
    default:
      return { pc: pc1, mobile: mobile1 };
  }
};

export default getMonthImage;
