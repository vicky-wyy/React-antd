import ajax from './ajax'

/* 
  用户接口
*/
/* 判断用户是否可以登录 */
export const reqLogin = (itcode) => 
  ajax('/api1/dml_v2/api/itcode_is_allowed_to_login',{itcode},'GET')
/* 获取用户信息 */
export const reqUsersInfo = (itcode) => 
  ajax('/api1/dml_v2/api/get_user_info',{itcode},'GET')
/* 获取用户列表(只有管理员才能获取) */
export const reqUsers = (itcode) => 
  ajax(`/api1/feedback_app/${itcode}/users`,'GET')
/* 添加用户(只有管理员才能添加) */
export const reqAddUsers = (itcode,email) => 
  ajax('/api1/feedback_app/wenyy/users',{itcode,email},'POST')
/* 获取用户角色(只有管理员才能获取) */
export const reqGetUserRole = (target_itcode) => 
  ajax(`/api1/feedback_app/wenyy/user_role/${target_itcode}`,'GET')
/* 更新用户角色(只有管理员才能更新) */
export const reqUpdateUserRole = (current_itcode,target_itcode,role_id,direction) =>
  ajax(`/api1/feedback_app/${current_itcode}/user_role/${target_itcode}`,{role_id,direction},'PUT')

/* 
  角色接口
*/
/* 获取角色列表(只有管理员可以获取) */
export const reqRoles = () =>
  ajax('/api1/feedback_app/wenyy/roles','GET')
/* 添加角色(只有管理员可以添加) */
export const reqAddRoles = (current_itcode,roleName) => 
  ajax(`/api1/feedback_app/${current_itcode}/roles`,{roleName},'POST')
/* 更新角色(只有管理员可以更新) */
export const reqUpdateRoles = (current_itcode,role_id,menus) =>
  ajax(`/api1/feedback_app/${current_itcode}/role/${role_id}`,{menus},'PUT')
/* 删除角色(只有管理员可以删除) */
export const reqDeleteRoles = (current_itcode,role_id) =>
  ajax(`/api1/feedback_app/${current_itcode}/role/${role_id}`,{},'DELETE')

/* 
  项目接口
*/
/* 获取项目 */
export const reqProjects = (current_itcode) => 
  ajax(`/api1/feedback_app/${current_itcode}/feedbacks`,'GET')
/* 添加项目 */
export const reqAddProject = (current_itcode,name,desc) => 
  ajax(`/api1/feedback_app/${current_itcode}/feedbacks`,{name,desc},'POST')
// 更新项目
export const reqUpdateProject = (current_itcode,project_id,name,desc,status) => 
  ajax(`/api1/feedback_app/${current_itcode}/feedback/${project_id}`,{name,desc,status}, 'PUT')
// 删除项目
export const reqDeleteProject = (current_itcode, project_id)=>
  ajax(`/api1/feedback_app/${current_itcode}/feedback/${project_id}`,{}, 'DELETE')
// 点赞
export const reqLikedProject = (current_itcode,project_id,direction)=> 
  ajax(`/api1/feedback_app/${current_itcode}/rate_feedback/${project_id}/${direction}`,{},'POST')
// 添加评论
export const reqAddComment = (current_itcode, project_id, content) => 
  ajax(`/api1/feedback_app/${current_itcode}/feedback_comments/${project_id}`,{content},'POST')
// 回复评论
export const reqReplyComment = (current_itcode,project_id,content,reply_to) =>
  ajax(`/api1/feedback_app/${current_itcode}/feedback_comments/${project_id}`,{content,reply_to},'POST')
// 删除评论
export const reqDeleteComment = (current_itcode, project_id) => 
  ajax(`/api1/feedback_app/${current_itcode}/feedback_comment/${project_id}`,{},'DELETE')
// 更新评论
export const reqUpdateComment = (current_itcode,project_id,content) =>
  ajax(`/api1/feedback_app/${current_itcode}/feedback_comment/${project_id}`,{content},'PUT')