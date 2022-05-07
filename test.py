def extendList(val, list=[]):
    list.append(val)
    print(list)
    return list

list= extendList(5) #1
list = extendList(555,[])
list = extendList('Z') #3
