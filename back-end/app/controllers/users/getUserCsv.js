const User = require('../../models/user')
const ContactInfo = require('../../models/contactInfo')
const UserBaseInfo = require('../../models/userBaseInfo')
const EducationHistory = require('../../models/educationHistory')
const JobHistorie = require('../../models/jobHistory')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const _ = require('lodash')
const { Parser, parse } = require('json2csv')
const fs = require('fs')
// const json2csv = require('json2csv')
const path = require('path')
const moment = require('jalali-moment')
/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUserCsv = async (req, res) => {
  try {
    let userId = req.user.id
    let id = req.params.id
    req = matchedData(req)
    id = id || userId
    console.log(id)
    id = await isIDGood(id)
    let item = await User.findOne({ _id: id }).populate([
      'userBaseInfo',
      'contactInfo',
      'educationHistories',
      'jobHistories',
      'researchs',
      'projects',
      'docs',
      'languages',
      'experiments',
      'moneyAccounts',
      'honors'
    ])
    let edus = item.educationHistories.map((value, index) => {
      return (
        '‍‍‍مقطع:' +
        value.sectionEdu +
        '\n' +
        'رشته تحصیلی:' +
        value.fieldEdu +
        '\n' +
        'گرایش:' +
        value.orientationEdu +
        '\n' +
        'نوع موسسه:' +
        value.uniType +
        '\n' +
        'عنوان موسسه:' +
        value.uniName +
        '\n' +
        'معدل:' +
        value.averageEdu +
        '\n' +
        'کشور:' +
        value.uniCountry +
        '\n' +
        'استان:' +
        value.uniProvince +
        '\n' +
        'شهر:' +
        value.uniCity +
        '\n' +
        'سال شروع:' +
        value.startEdu +
        '\n' +
        'سال فراغت:' +
        `${value.stillStudying ? 'درحال تحصیل' : value.endEdu}` +
        '\n'
      )
    })

    let languages = item.languages.map((value) => {
      let str = ''
      const obj = {
        زبان: value.Name,
        خواندن: value.readSkill,
        نوشتن: value.writeSkill,
        شنیداری: value.hearSkill,
        گفتاری: value.speakSkill
      }

      _.map(obj, (value, key) => {
        str = str + key + ':' + value + '\n'
      })

      return str
    })

    let experiments = item.experiments.map((value) => {
      let str = ''
      const obj = {
        مهارت: value.Name,
        درجه: value.skillLevel,
        توضیحات: value.description
      }

      _.map(obj, (value, key) => {
        str = str + key + ':' + value + '\n'
      })

      return str
    })

    let moneyAccounts = item.moneyAccounts.map((value) => {
      let str = ''
      const obj = {
        مهارت: value.Name,
        درجه: value.skillLevel,
        توضیحات: value.description
      }

      _.map(obj, (value, key) => {
        str = str + key + ':' + value + '\n'
      })

      return str
    })

    let jobs = item.jobHistories.map((value) => {
      let str = ''
      const obj = {
        'سمت شغلی': value.jobTitle,
        'گروه شغلی': value.jobGroup,
        'مرکز شغلی': value.jobCenter,
        'عنوان مرکز': value.titleCenter,
        'نحوه همکاری': value.cooperateType,
        'سطح ارشدیت': value.seniorLevel,
        کشور: value.jobCountry,
        استان: value.jobProvince,
        شهر: value.jobCity,
        'سال شروع': value.startJobYear,
        'ماه شروع': value.startJobMonth,
        'سال اتمام': value.stillWorking ? 'مشغول به فعالیت' : value.endJobYear,
        'ماه اتمام': value.stillWorking ? 'مشغول به فعالیت' : value.endJobMonth,
        درامد: value.income,
        'شماره تماس': value.number,
        'وظایف و دستاورد ها': value.jobDescription
      }

      _.map(obj, (value, key) => {
        str = str + key + ':' + value + '\n'
      })

      return str
    })

    let projects = item.projects.map((value) => {
      let str = ''
      const obj = {
        عنوان: value.projectTitle,
        کارفرما: value.projectEmployer,
        لینک: value.projectHyperlink,
        'سال شروع': value.startProjectYear,
        'ماه شروع': value.startProjectMonth,
        'سال اتمام': value.endProjectYear,
        'ماه اتمام': value.endProjectMonth,
        توضیحات: value.projectDescription
      }
      _.map(obj, (value, key) => {
        str = str + key + ':' + value + '\n'
      })

      return str
    })
    let researchs = item.researchs.map((value) => {
      let str = ''
      const obj = {
        'نوع اثر': value.researchType,
        عنوان: value.researchTitle,
        'نوع مقاله': value.articleType,
        ناشر: value.publisher,
        لینک: value.researchHyperlink,
        سال: value.researchYear,
        ماه: value.researchMonth,
        توضیحات: value.researchDescription
      }
      _.map(obj, (value, key) => {
        str = str + key + ':' + value + '\n'
      })

      return str
    })
    if (item.userBaseInfo === undefined) {
      item.userBaseInfo = new UserBaseInfo()
    }
    if (item.contactInfo === undefined) {
      item.contactInfo = new ContactInfo()
    }
    let baseItems = {
      نام: item.userBaseInfo.firstName,
      نام‌خانوادگی: item.userBaseInfo.lastName,
      شغل: item.userBaseInfo.job,
      جنسیت: item.userBaseInfo.gender,
      'وضعیت تاهل': item.userBaseInfo.marital,
      'وضعیت نظام‌وظیفه': item.userBaseInfo.military,
      'تاریخ تولد': moment(item.userBaseInfo.birthDay)
        .locale('fa')
        .format('YYYY/MM/DD'),
      ' توصیف خلاصه': item.userBaseInfo.description,
      ایمیل: item.contactInfo.email,
      موبایل: item.contactInfo.phone,
      تلفن: item.contactInfo.tel,
      ' وب‌سایت': item.contactInfo.webPage,
      کشور: item.contactInfo.country,
      استان: item.contactInfo.province,
      شهر: item.contactInfo.city,
      آدرس: item.contactInfo.address,
      'کد ثنا': item.contactInfo.sanaCode,
      ' شبکه اجتماعی': item.contactInfo.socialMediaName,
      ' آی دی مرتبط': item.contactInfo.socialMediaId
    }
    const eusObj = {
      'سوابق تحصیلی': edus
    }
    let csvItems = []
    const max = Math.max(
      edus.length,
      jobs.length,
      projects.length,
      researchs.length,
      languages.length,
      experiments.length,
      moneyAccounts.length
    )
    for (let index = 0; index < max; index++) {
      csvItems[index] = {
        'سوابق تحصیلی': edus[index] ? edus[index] : '',
        'سوابق شغلی': jobs[index] ? jobs[index] : '',
        'پروژه ها': projects[index] ? projects[index] : '',
        تحقیقات: researchs[index] ? researchs[index] : '',
        زبان: languages[index] ? languages[index] : '',
        'مهارت تجربی': experiments[index] ? experiments[index] : '',
        'اطلاعات مالی': moneyAccounts[index] ? moneyAccounts[index] : ''
      }
      if (index === 0) {
        csvItems[index] = { ...baseItems, ...csvItems[index] }
      }
    }

    const parser = new Parser({ withBOM: true })
    const csvUser = parser.parse(csvItems)

    const csvFileName = path.join(__dirname, `../../../uploads/csv/${id}.csv`)

    fs.writeFile(csvFileName, csvUser, { encoding: 'utf8' }, function (err) {
      if (err) throw err
      console.log('file saved')
      res.status(200).download(csvFileName, `csv_${item.phone}.csv`)
    })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getUserCsv }
