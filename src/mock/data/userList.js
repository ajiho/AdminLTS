const userList = {
  'id|+1': 1,
  name: '@cname',
  username: '@string(6, 12)',
  gender: '@boolean',
  phone: '@phone',
  email: '@email',
  create_at: '@datetime',
  status: '@integer(0,1)',
  role_id: '@integer(0,6)',
}

export default userList
