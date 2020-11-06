const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema } = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true
      // unique: true
    },
    phone: {
      type: String,
      validate: {
        validator(v) {
          return validator.isMobilePhone(v, 'fa-IR')
        },
        message: 'PHONE_IS_NOT_A_VALID_IR_MOBILE_PHONE'
      },
      required: true,
      unique: true
    },
    password: {
      type: String,
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    verification: {
      type: String
    },
    verified: {
      type: Boolean,
      default: false
    },
    loginAttempts: {
      type: Number,
      default: 0,
      select: false
    },
    blockExpires: {
      type: Date,
      default: Date.now,
      select: false
    },
    userBaseInfo: {
      type: Schema.Types.ObjectId,
      ref: 'UserBaseInfo'
    },
    contactInfo: {
      type: Schema.Types.ObjectId,
      ref: 'ContactInfo'
    },
    educationHistories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'EducationHistory'
      }
    ],
    jobHistories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'JobHistory'
      }
    ],
    docs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Doc'
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const hash = (user, salt, next) => {
  bcrypt.hash(user.password, salt, (error, newHash) => {
    if (error) {
      return next(error)
    }
    user.password = newHash
    return next()
  })
}

const genSalt = (user, SALT_FACTOR, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    return hash(user, salt, next)
  })
}

UserSchema.pre('save', function (next) {
  const that = this
  const SALT_FACTOR = 5
  if (!that.isModified('password')) {
    return next()
  }
  return genSalt(that, SALT_FACTOR, next)
})

UserSchema.methods.comparePassword = function (passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
    err ? cb(err) : cb(null, isMatch)
  )
}
UserSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('User', UserSchema)
