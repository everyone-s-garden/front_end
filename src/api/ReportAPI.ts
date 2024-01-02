import HttpRequest from './HttpRequest';

export const RESULT = {
  FALSESALES: '허위매물',
  REAPTED: '도배글',
  INSULTS: '욕설',
  SEXUAL: '선정성',
  PRIVACY: '개인정보노출',
  OTHERS: '기타',
};

// export const ReportAPI = {
//   reportGarden: async (postId: number, reporterId: number, item: typeof RESULT, content: string) => {
//     const { data } = await HttpRequest.post(`v1/report?postId=${postId}&reporterId=${reporterId}`, {
//       item: item,
//       content: content,
//     });
//     return data;
//   },
// };

interface ReportApiType {
  postId: number;
  content: string;
  reportType: string;
}

export const ReportApi = async ({ postId, content, reportType }: ReportApiType) => {
  const { data } = await HttpRequest.post(`/v1/reports/${postId}`, {
    content: content,
    reportType: reportType,
  });

  return data;
};
