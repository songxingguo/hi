import Valine from 'valine';
new Valine({
  el: '#vcomments',
  appId: '5KNE77KGRoBwz0eTtPxWksTj-gzGzoHsz',
  appKey: '2oU4tvtGWAXp5i6kWAnhd2rm',
  notify: true, // 邮件提醒!!!
  verify: true, // 验证码
  placeholder: 'ヾﾉ≧∀≦)o来啊，快活啊!',
  avatar: 'wavatar',
  visitor: true // 阅读量统计
});