import AV from 'leancloud-storage'

var APP_ID = 'cIpWugkylWCpzh5yJmQp6tLS-gzGzoHsz';
var APP_KEY = 'X9tGE2h7t48YQclEv2J5a7RT';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV;

export const TodoModel = {
  getByUser(user,successFn,errorFn){
    let query = new AV.Query('Todo')
    query.equalTo('deleted',false);
    query.find().then((res)=>{
      let array = res.map((t)=>{
        return {id:t.id,...t.attributes}
      })
      successFn.call(null,array)
    },(error)=>{
      errorFn && errorFn.call(null,error)
    })
  },
  create({ status, title, deleted,currentTime }, successFn, errorFn) {
    let Todo = AV.Object.extend('Todo')
    let todo = new Todo()
    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)
    todo.set('currentTime',currentTime)
     // 根据文档 https://leancloud.cn/docs/acl-guide.html#单用户权限设置
     // 这样做就可以让这个 Todo 只被当前用户看到
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false)
    acl.setWriteAccess(AV.User.current(),true)
    acl.setReadAccess(AV.User.current(),true)

    todo.setACL(acl)
    todo.save().then(function (res) {
      successFn.call(null, res)
    }, function (error) {
      errorFn && error.call(null, error)
    })
  },
  update({id,title,status,deleted},successFn,errorFn) {
    let todo = AV.Object.createWithoutData('Todo',id)
    title !== undefined && todo.set('title',title)
    status !== undefined && todo.set('status',status)
    deleted !== undefined && todo.set('deleted',deleted)
    // 为什么我要像上面那样写代码？
     // 考虑如下场景
     // update({id:1, title:'hi'})
     // 调用 update 时，很有可能没有传 status 和 deleted
     // 也就是说，用户只想「局部更新」
     // 所以我们只 set 该 set 的
    // 那么为什么不写成 title && todo.set('title', title) 呢，为什么要多此一举跟 undefined 做对比呢？
     // 考虑如下场景
    // update({id:1, title: '', status: null}}
    // 用户想将 title 和 status 置空，我们要满足
    todo.save().then((res)=>{
      successFn && successFn.call(null)
    },(error)=>{
      errorFn && errorFn.call(null,error)
    })
  },
  destroy(todoId,successFn,errorFn) {
    // let todo = AV.Object.createWithoutData('Todo',todoId)
    // todo.destroy().then(function(res){
    //   successFn && successFn.call(null)
    // },function(error){
    //   errorFn && errorFn.call(null,error)
    // })
    TodoModel.update({id:todoId,deleted:true},successFn,errorFn)
  }
}

export function signUp(email, username, password, successFn, errorFn) {
  //新建AVUser 对象实例
  var user = new AV.User();
  //设置用户名
  user.setUsername(username)
  //设置密码
  user.setPassword(password)
  //设置邮箱
  user.setEmail(email)

  user.signUp().then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn(user)
  }, function (error) {
    errorFn.call(null, error)
  })
}
export function signIn(username, password, successFn, errorFn) {
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })

  return undefined
}

export function sendPasswordResetEmail(email, successFn, errorFn) {
  AV.User.requestPasswordReset(email).then(function (success) {
    successFn.call(null,success)
  }, function (error) {
    errorFn.call(null, error)
  })
}

export function signOut() {
  AV.User.logOut()
  return undefined
}

export function getCurrentUser() {
  let current = AV.User.current();

  if (current) {
    return getUserFromAVUser(current)
  } else {
    return null
  }
}

function getUserFromAVUser(AVUser) {
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}