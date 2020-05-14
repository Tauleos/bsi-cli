<template>
  <div class="forbidden">
    <div class="content">
      <div>
        <img src="" alt="" />
        <div class="title">暂无权限</div>
        <div class="mail">
          <div class="mail-tip">
            如需申请权限，请发送申请邮件-邮件格式如下：
          </div>
          <ul>
            <li>&nbsp;邮件标题：[权限申请]{{ title }}</li>
            <li>
              邮件正文：
              <div class="mail-content">
                <div>邮箱：yourname@email.com</div>
                <div>米ID：12345678</div>
                <div>申请原因：因XX需要，需要申请{{ title }}XX权限</div>
              </div>
            </li>
            <li>
              收件人：<a v-for="(mail, i) in emails" :key="i" :href="`mailto:${mail}@xiaomi.com`" class="mail-link">{{
                `${mail}@xiaomi.com${i === emails.length - 1 ? '' : ';'}`
              }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.forbidden {
  padding-top: 10px;
  height: 100%;
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #fff;
    img {
      display: none;
    }
    .title {
      margin-bottom: 20px;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #333333;
      text-align: center;
      line-height: 24px;
    }
    .mail {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #999999;
      line-height: 18px;
      .mail-tip {
        margin-bottom: 10px;
      }
      ul,
      li {
        padding: 0;
        margin: 0;
        list-style: none;
      }
      li::before {
        display: inline-block;
        vertical-align: 1px;
        margin-right: 5px;

        content: '';
        width: 8px;
        height: 8px;
        background: #9bbfe0;
        border-radius: 100%;
      }
      .mail-content {
        padding-left: 32px;
      }
      .mail-link {
        margin-right: 8px;
        color: #457bfc;
        border-bottom: 1px solid #457bfc;
      }
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      title: '标签信息管理后台',
      emails: ['yaolin1', 'chenyiming1']
    };
  }
};
</script>
