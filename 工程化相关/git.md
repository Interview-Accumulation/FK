### 版本回滚
- `git revert commit_id`: 回滚到指定版本，commit_id为版本号, 会生成一个新的commit,保留原来的commit，但是会把原来的commit的修改内容反向修改一遍

### git pull 和 git fetch 的区别
- `git fetch`: 从远程获取最新版本到本地，不会自动merge
- `git pull`: 相当于`git fetch` + `git merge`

### git revert 、 git reset 和 git rebase 的区别
- git revert 撤销 某次操作，此次操作之前和之后的commit和history都会保留，并且把这次撤销
作为一次最新的提交
- git reset 撤销某次操作，此次操作之后的commit和history都会被删除，此次操作之前的commit和history都会保留
- git rebase 会把本地未push的分叉提交历史整理成直线；rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比
- [rebase参考](https://www.cnblogs.com/ygunoil/p/15466337.html)


### git cherry-pick
- [参考](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)