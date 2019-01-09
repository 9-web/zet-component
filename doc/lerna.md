### lerna cmd
* lerna bootstrap 安装依赖



### lerna add
```
multi-packages/
  package.json
  packages/
    package-1/
      package.json
    package-2/
      package.json
```

1. lerna add babel , 该命令会在package-1和package-2下安装babel
2. lerna add react --scope=package-1 ,该命令会在package-1下安装react
3. lerna add package-2 --scope=package-1，该命令会在package-1下安装package-2


### lerna publish