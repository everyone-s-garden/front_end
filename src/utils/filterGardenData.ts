const filterGardenData = {
  filterPrice: (price: string | null) => {
    // null check
    if (!price) return '가격 정보 없음';

    // 콤마 삭제
    price = price.replace(/,/g, '');

    // 숫자 아닌 정보도 포함되었는지 체크
    if (isNaN(Number(price)) || isNaN(parseFloat(price))) return price;

    if (price === '0') return '무료';

    return `${Number(price).toLocaleString()} 원`;
  },
  filterSize: (size: string | null) => {
    // null check
    if (!size) return '면적 정보 없음';

    // 콤마 삭제
    size = size.replace(/,/g, '');

    // null check
    if (size === '') return '면적 정보 없음';

    // 숫자 아닌 정보도 포함되었는지 체크
    if (isNaN(Number(size)) || isNaN(parseFloat(size))) return size;

    return `${Number(size).toLocaleString()} 평`;
  },
};

export default filterGardenData;
