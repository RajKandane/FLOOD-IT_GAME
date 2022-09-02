T = int(input())
import numpy as np
for t in range(T):
    N=int(input())
    R=N
    C=N
    Matrix=[]
    for i in range(R):
        Matrix.append(list(map(int,input().split())))
    def cluster(Matrix,x,y):
        a=set()
        val=Matrix[x][y]
        stack=[]
        stack.append((x,y))
        while(len(stack)>0):
            curr=stack.pop()
            a.add(curr)
            curr_x=curr[0]
            curr_y=curr[1]
            values=[(curr_x+1,curr_y),(curr_x,curr_y+1),(curr_x-1,curr_y),(curr_x,curr_y-1)]
            for value in values:
                if(value[0]<R and value[0]>=0 and value[1]<C and value[1]>=0):
                    if(Matrix[value[0]][value[1]]==val and value not in a):
                        stack.append(value)
        return a
    def flood(Matrix,x,y,color):
        a=cluster(Matrix,x,y)
        for value in a:
            Matrix[value[0]][value[1]]=color
    def final():
        g=np.copy(Matrix)
        s=cluster(g,0,0)
        c=R*C
        r=[]
        while(len(s)!=c):
            a=[]
            for i in range(7):
                a.append(np.copy(g))
            b=[0]*7
        
            for j in range(7):
                flood(a[j],0,0,j)
                b[j]=len(cluster(a[j],0,0))
            max_index=b.index(np.max(b))
            g=a[max_index]
            s=cluster(g,0,0)
            r.append(max_index)
        return r
    cv=final()
    dic={1:0,2:0,3:0,4:0,5:0,6:0}
    for i in cv:
        if i in dic:
            dic[i]+=1
    print(len(cv))
    print(str(dic[1])+" "+str(dic[2])+" "+str(dic[3])+" "+str(dic[4])+" "+str(dic[5])+" "+str(dic[6]))
    
    