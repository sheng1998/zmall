<template>
  <div class="manage-logo">
    <div class="xmf-system-flex fzzj">商城 LOGO 管理</div>
    <el-card class="history-logo">
      <div class="title">
        <span>历史 logo</span>, 第一个为目前正在使用的 logo,
        仅展示历史记录中最新的的 10 个 logo。
      </div>
      <div class="logo-list">
        <div class="logo-item" v-for="img in logoList" :key="img.logo_url">
          <el-image
            fit="cover"
            :src="img.logo_url"
          ></el-image>
        </div>
      </div>
    </el-card>

    <div class="upload-logo">
      <div class="title">上传新logo</div>
      <div class="upload-region">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:3002/uploads"
          :show-file-list="true"
          :on-success="handleLogoSuccess"
          :before-upload="beforeLogoUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="upload-btn">
        <el-button type="primary" @click="submitLogo">上传</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: '',
      logoUrl: '',
      logoList: []
    }
  },
  created () {
    this.getLogoList()
  },
  mounted () {},
  methods: {
    // 获取logo列表
    getLogoList () {
      this.$axios.get('/get/logo').then(res => {
        this.logoList = res.data.data.logoList
      })
    },
    // logo 上传成功触发
    handleLogoSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.logoUrl = file.response.data.tmp_path
    },

    // logo 上传之前触发该方法，用户校验文件类型和文件大小
    beforeLogoUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传logo图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传logo图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },

    // 点击上传按钮，保存 logo 的信息到数据库
    submitLogo () {
      if (this.logoUrl.trim() !== '') {
        this.$axios
          .post('/save/logo', {
            url: this.logoUrl
          })
          .then(res => {
            if (res.data.meta.status === 200) {
              this.$message.success('上传成功！')
              // 重新获取logo数据
              this.getLogoList()
              this.imageUrl = ''
            }
          })
      } else {
        this.$message.error('请先选择logo!')
      }
    }
  }
}
</script>

<style lang="less">
.manage-logo {
  .el-card__body {
    padding: 0;
  }

  .history-logo {
    .title {
      padding: 10px 15px;
      background-color: #eaf8ff;
      border-bottom: 1px solid #daf3ff;
      font-weight: 500;
      font-size: 15px;

      span {
        font-size: 16px;
        font-weight: 700;
      }
    }

    .logo-list {
      padding: 10px 20px;
      display: flex;

      .logo-item {
        width: 10%;
        padding: 0 10px;

        &:not(:last-child) {
          border-right: 1px solid #daf3ff;
        }
      }
    }
  }

  .upload-logo {
    margin-top: 30px;

    .title {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 700;
    }

    .upload-region {
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
      .el-upload-list.el-upload-list--text {
        display: none;
      }
    }

    .upload-btn {
      margin-top: 20px;

      .el-button {
        width: 180px;
      }
    }
  }
}
</style>
