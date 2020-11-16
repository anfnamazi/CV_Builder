const User = require('../../models/user')
const ContactInfo = require('../../models/contactInfo')
const UserBaseInfo = require('../../models/userBaseInfo')
const EducationHistory = require('../../models/educationHistory')
const JobHistorie = require('../../models/jobHistory')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')

const { Parser, parse } = require('json2csv')
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
      'docs'
    ])
    let edus = item.educationHistories.map((value) => {
      return {
        مقطع: value.sectionEdu,
        'رشته تحصیلی': value.fieldEdu,
        گرایش: value.orientationEdu,
        'توع موسسه': value.uniType,
        'عنوان موسسه': value.uniName,
        معدل: value.averageEdu,
        کشور: value.uniCountry,
        استان: value.uniProvince,
        شهر: value.uniCity,
        'سال شروع': value.startEdu,
        'سال فراغت': value.stillStudying ? 'درحال تحصیل' : value.endEdu
      }
    })
    let jobs = item.jobHistories.map((value) => {
      return {
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
    })
    let projects = item.projects.map((value) => {
      return {
        عنوان: value.projectTitle,
        کارفرما: value.projectEmployer,
        لینک: value.projectHyperlink,
        'سال شروع': value.startProjectYear,
        'ماه شروع': value.startProjectMonth,
        'سال اتمام': value.endProjectYear,
        'ماه اتمام': value.endProjectMonth,
        توضیحات: value.projectDescription
      }
    })
    let researchs = item.researchs.map((value) => {
      return {
        'نوع اثر': value.researchType,
        عنوان: value.researchTitle,
        'نوع مقاله': value.articleType,
        ناشر: value.publisher,
        لینک: value.researchHyperlink,
        سال: value.researchYear,
        ماه: value.researchMonth,
        توضیحات: value.researchDescription
      }
    })
    if (item.userBaseInfo === undefined) {
      item.userBaseInfo = new UserBaseInfo()
    }
    if (item.contactInfo === undefined) {
      item.contactInfo = new ContactInfo()
    }
    let csvItem = {
      نام: item.userBaseInfo.firstName,
      نام‌خانوادگی: item.userBaseInfo.lastName,
      شغل: item.userBaseInfo.job,
      جنسیت: item.userBaseInfo.gender,
      'وضعیت تاهل': item.userBaseInfo.marital,
      'وضعیت نظام‌وظیفه': item.userBaseInfo.military,
      'تاریخ تولد': item.userBaseInfo.birthDay,
      'توصیف خلاصه': item.userBaseInfo.description,
      ایمیل: item.contactInfo.email,
      موبایل: item.contactInfo.phone,
      تلفن: item.contactInfo.tel,
      وب‌سایت: item.contactInfo.webPage,
      کشور: item.contactInfo.country,
      استان: item.contactInfo.province,
      شهر: item.contactInfo.city,
      آدرس: item.contactInfo.address,
      'شبکه اجتماعی': item.contactInfo.socialMediaName,
      'آی دی مرتبط': item.contactInfo.socialMediaId
    }
    let csvUser = parse(csvItem)
    if (edus.length) {
      let csvEdus = parse(edus)
      csvEdus = 'سوابق تحصیلی\r\n' + csvEdus
      csvUser = csvUser + '\r\n' + csvEdus
    }
    if (jobs.length) {
      let csvJobs = parse(jobs)
      csvJobs = 'سوابق شغلی\r\n' + csvJobs
      csvUser = csvUser + '\r\n' + csvJobs
    }
    if (projects.length) {
      let csvProjects = parse(projects)
      csvProjects = 'پروژه ها\r\n' + csvProjects
      csvUser = csvUser + '\r\n' + csvProjects
    }
    if (researchs.length) {
      let csvResearchs = parse(researchs)
      csvResearchs = 'پروژه ها\r\n' + csvResearchs
      csvUser = csvUser + '\r\n' + csvResearchs
    }
    res.setHeader('Content-disposition', 'attachment; filename=testing.csv')
    res.set('Content-Type', 'text/csv')
    res.status(200).send(csvUser)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getUserCsv }
