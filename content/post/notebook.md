+++
title = "Exercises physical modeling of complex systems"
date = "2020-04-14"
author = "Jan Stevens"
+++


## Problem set 1

### Problem 1.1


```python
import numpy as np
import matplotlib.pyplot as plt

dt = 10**-3
T = 1000
k = 1000
a = 3

N = np.zeros(T)
N[0] = 100000

c = (k - N[0]) / (k * N[0])


def f(x):
    return a * x * (1 - x / k)


def N_exact(x):
    return k / (1 + c * k * np.e**(-a * x))


for i in range(1, T):
    N[i] = N[i - 1] + f(np.float(N[i - 1])) * dt

x = np.linspace(0, 1, 1000)
plt.plot(x, N_exact(x),label='Exact solution')
plt.plot(x, N,label='Numerical solution')
plt.title('Solution of logistic growth model')
plt.grid(True,linestyle='--', alpha=0.7)
plt.legend(loc=7, prop={'size': 8.5})
plt.xlabel('Time')
plt.ylabel('N')
plt.show()
```


![png](output_3_0.png)



```python
x = np.linspace(0, 2, 1000)
plt.plot(x, np.log(np.abs(N_exact(x) - k)))
plt.scatter(1, 4)
plt.scatter(2, 1)
plt.title('linear stability analysis of the logistic growth model')
plt.grid(True,linestyle='--', alpha=0.7)
plt.xlabel('Time')
plt.ylabel('$log( |N-K| )$')
plt.show()
plt.show()
```


![png](/post/notebook/output_4_0.png)


### Problem 1.3


```python
c2 = -np.log(N[0] / k)


def g(x):
    return k * np.e**(-c2 * np.e**(-a * x))


x = np.linspace(0, 4, 1000)
plt.plot(x, N_exact(x))
plt.plot(x, g(x))
plt.title('Gompertz law')
plt.grid(True,linestyle='--', alpha=0.7)
plt.xlabel('Time')
plt.ylabel('N')
plt.show()
```

    No handles with labels found to put in legend.



![png](/post/notebook/output_6_1.png)


### Problem 1.4


```python
from ddeint import ddeint

# Defining parameters
T = 3
a = 1
k = 1e3


# Delayed differential equation model
def model(N, t, T):
    x = N(t)
    xd = N(t - T)
    return a * x * (1 - xd / k)


# Solving the delayed differential equation
g = lambda t: 10000
tt = np.linspace(1, 6, 10000)
N = ddeint(model, g, tt, fargs=(T, ))

# Plotting population evolution
plt.plot(tt, N)
plt.title('Delayed logistic growth model')
plt.grid(True,linestyle='--', alpha=0.7)
plt.xlabel('Time')
plt.ylabel('N')
plt.show()
```


![png](/post/notebook/output_8_0.png)


## Problem set 2

### Problem 1.5


```python
import numpy as np
import matplotlib.pyplot as plt

# Defining integration parameters
dt = 10**-3
T = 20000

# Defining initial conditions
N = np.zeros(T)
M = np.zeros(T)
initial = np.array([[0.5, 0.5], [3, 1.5], [1.5, 2], [1.5, 1.5]])



# f = dn/dt
def f(n, m):
    return n * (3 - n - 2 * m)


# g = dm/dt
def g(n, m):
    return m * (2 - n - m)

# Euler integrator
fig, axs = plt.subplots(1, 4, figsize=(17, 4.5))
fig.suptitle("Population evolution for various intial conditions", x=0.5, y=1.1, fontsize=20, fontweight="bold")
for j in range(0, 4):
    N[0] = initial[j][0]
    M[0] = initial[j][1]
    for i in range(1, T):
        N[i] = N[i - 1] + f(np.float(N[i - 1]), np.float(M[i - 1])) * dt
        M[i] = M[i - 1] + g(np.float(N[i - 1]), np.float(M[i - 1])) * dt

    a = np.linspace(0, T*dt, T)
    axs[j].plot(a, N, color='green', label='N(t)')
    axs[j].plot(a, M, color='red', label='M(t)')
    axs[j].set_title('Initial condition: ' + np.str(initial[j]))
    axs[j].grid(True,linestyle='--', alpha=0.7)
    axs[j].legend(loc=7, prop={'size': 8.5})
    axs[j].set_xlabel('Time')
plt.show()
plt.savefig('image.jpeg')
```


![png](/post/notebook/output_11_0.png)



    <Figure size 432x288 with 0 Axes>



```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import odeint

def f(x, t):
    return np.array([x[0]*(3-x[0]-2*x[1]),x[1]*(2-x[0]-x[1])])

t = 0
y1 = np.linspace(0, 4.0, 20)
y2 = np.linspace(0, 4.0, 20)
Y1, Y2 = np.meshgrid(y1, y2)
u, v = np.zeros(Y1.shape), np.zeros(Y2.shape)

NI, NJ = Y1.shape
for i in range(NI):
    for j in range(NJ):
        x = Y1[i, j]
        y = Y2[i, j]
        yprime = f(np.array([x, y]), t)
        u[i,j] = yprime[0]
        v[i,j] = yprime[1]
    
# Plotting        
fig, axs = plt.subplots(1, 1, figsize=(9, 7))
# Phase portrait
Q = plt.quiver(Y1, Y2, u, v, color='black',units='x', pivot='tip', width=0.02, scale= 1 / 0.02)
# Calculating phase space trajectories
for y0 in [[1,1],[2,3],[3.5,2],[0.1,0.1],[4,2.7123],[4,2.712],[0.05,0.2]]:
    tspan = np.linspace(0, 50, 200)
    ys = odeint(f, y0, tspan)
    plt.plot(ys[:,0], ys[:,1], 'r-') # path
    plt.plot([ys[0,0]], [ys[0,1]], 'o', color='green') # start
    plt.plot([ys[-1,0]], [ys[-1,1]], 's', color='red') # end  
plt.xlabel('$N$')
plt.ylabel('$M$')
plt.xlim([0, 4])
plt.ylim([0, 4])
plt.title('Fase portrait of the Lotka-Volterra models: sheeps vs rabbits',size=15)
plt.show()
```


![png](/post/notebook/output_12_0.png)


## Problem 2.3


```python
import numpy as np
import matplotlib.pyplot as plt

# Defining integration parameters
dt = 10**-3
T = 1000

# Defining initial conditions
x = np.zeros(T)
y = np.zeros(T)
initial = np.array([[1, 2], [1, 1.5], [-1, -2], [-1, -1.2]])

# f = dx/dt
def f(x, y):
    return x - y

# g = dy/dt
def g(x, y):
    return 1 - np.e**x

# Euler integrator
fig, axs = plt.subplots(1, 4, figsize=(17, 4.5))
fig.suptitle("Population evolution for various intial conditions", x=0.5, y=1.1, fontsize=20, fontweight="bold")
for j in range(0, 4):
    x[0] = initial[j][0]
    y[0] = initial[j][1]
    for i in range(1, T):
        x[i] = x[i - 1] + f(np.float(x[i - 1]), np.float(y[i - 1])) * dt
        y[i] = y[i - 1] + g(np.float(x[i - 1]), np.float(y[i - 1])) * dt

    # Plotting the population evolution
    axs[j].scatter(initial[j][0], initial[j][1], color='green', zorder=1, label="$t_{0}$")
    axs[j].scatter(x[T-1], y[T-1], color='red', zorder=1, label="$t_{end}$")
    axs[j].plot(x, y, zorder=-1)
    axs[j].set_title('Initial condition: ' + np.str(initial[j]))
    axs[j].grid(True,linestyle='--', alpha=0.7)
    axs[j].legend(loc=8, prop={'size': 8.5})
    axs[j].set_xlabel('x')
    axs[0].set_ylabel('y')
plt.show()
```


![png](/post/notebook/output_14_0.png)


## Problem 3.1


```python
import numpy as np
import matplotlib.pyplot as plt

# Defining integration parameters
dt = 10**-4
T = 60000

# Defining initial conditions
x = np.zeros(T)
y = np.zeros(T)
initial = np.array([1, 0])


# f = dx/dt
def f(x, y):
    return -3 * x + y


# g = dy/dt
def g(x, y):
    return 100 * (2 * x - y)


# Euler integrator
fig, axs = plt.subplots(1, 2, figsize=(17, 4.5))
fig.suptitle("Verifying the quasi steady state approximation",
             x=0.5,
             y=1.1,
             fontsize=20,
             fontweight="bold")

x[0] = initial[0]
y[0] = initial[1]
a = np.linspace(0, T*dt, T)

for i in range(1, T):
    x[i] = x[i - 1] + f(np.float(x[i - 1]), np.float(y[i - 1])) * dt
    y[i] = y[i - 1] + g(np.float(x[i - 1]), np.float(y[i - 1])) * dt

# Plotting the populasion evolution
axs[0].scatter(0, initial[1], color='green', zorder=1, label="$t_{0}$")
axs[0].scatter((T-1)*dt, y[T - 1], color='red', zorder=1, label="$t_{end}$")
axs[0].plot(a, y, zorder=-1, label="Numerical")
axs[0].plot(a, 2*np.e**(-a), label="QSSA", zorder=-1)
axs[0].set_title('Initial condition: y(0) = 0')
axs[0].grid(True, linestyle='--', alpha=0.7)
axs[0].legend(loc=7, prop={'size': 8.5})
axs[0].set_xlabel("Time(t)")
axs[0].set_ylabel("y(t)")

axs[1].scatter(0, initial[0], color='green', zorder=1, label="$t_{0}$")
axs[1].scatter((T-1)*dt, x[T - 1], color='red', zorder=1, label="$t_{end}$")
axs[1].plot(a, x, zorder=-1, label="Numerical")
axs[1].plot(a,np.e**(-a), zorder = -1, label="QSSA")
axs[1].set_title('Initial condition: x(0) = 1')
axs[1].grid(True, linestyle='--', alpha=0.7)
axs[1].legend(loc=7, prop={'size': 8.5})
axs[1].set_xlabel("Time(t)")
axs[1].set_ylabel("x(t)")
plt.show()
```


![png](/post/notebook/output_16_0.png)



```python
import numpy as np
import matplotlib.pyplot as plt

# Defining integration parameters
dt = 10**-4
T = 7000

# Defining initial conditions
x = np.zeros(T)
y = np.zeros(T)
initial = np.array([1, 0])


# f = dx/dt
def f(x, y):
    return -3 * x + y


# g = dy/dt
def g(x, y):
    return 100 * (2 * x - y)


# Euler integrator
fig, axs = plt.subplots(1, 2, figsize=(17, 4.5))
fig.suptitle("Verifying the quasi steady state approximation",
             x=0.5,
             y=1.1,
             fontsize=20,
             fontweight="bold")

x[0] = initial[0]
y[0] = initial[1]
a = np.linspace(0, T*dt, T)

for i in range(1, T):
    x[i] = x[i - 1] + f(np.float(x[i - 1]), np.float(y[i - 1])) * dt
    y[i] = y[i - 1] + g(np.float(x[i - 1]), np.float(y[i - 1])) * dt

# Plotting the populasion evolution
axs[0].scatter(0, initial[1], color='green', zorder=1, label="$t_{0}$")
axs[0].scatter((T-1)*dt, y[T - 1], color='red', zorder=1, label="$t_{end}$")
axs[0].plot(a, y, zorder=-1, label="Numerical")
axs[0].plot(a, 2*np.e**(-a), label="QSSA", zorder=-1)
axs[0].set_title('Initial condition: y(0) = 0')
axs[0].grid(True, linestyle='--', alpha=0.7)
axs[0].legend(loc=7, prop={'size': 8.5})
axs[0].set_xlabel("Time(t)")
axs[0].set_ylabel("y(t)")

axs[1].scatter(0, initial[0], color='green', zorder=1, label="$t_{0}$")
axs[1].scatter((T-1)*dt, x[T - 1], color='red', zorder=1, label="$t_{end}$")
axs[1].plot(a, x, zorder=-1, label="Numerical")
axs[1].plot(a,np.e**(-a), zorder = -1, label="QSSA")
axs[1].set_title('Initial condition: x(0) = 1')
axs[1].grid(True, linestyle='--', alpha=0.7)
axs[1].legend(loc=7, prop={'size': 8.5})
axs[1].set_xlabel("Time(t)")
axs[1].set_ylabel("x(t)")
plt.show()
```


![png](/post/notebook/output_17_0.png)


## Problem set 3

## Problem 4.1


```python
import igraph as ig
import numpy as np
import matplotlib.pyplot as plt

# Loading in the dictionary
file = open('dict.txt', 'r').readlines()
dict = {}

for line in file:
    command, description = line.strip().split(' ', 1)
    dict[command] = description.strip()
```


```python
# Loading in the network as graph
g = ig.Graph.Read_Ncol("ecoli.txt", names=True, directed=True)

# Coloring the arrows by weight
for e in g.es:
    if e["weight"] == 1.0:
        e["color"] = "green"
    elif e["weight"] == 2.0:
        e["color"] = "red"
    else:
        e["color"] = "blue"

# Plotting the graph
fig = plt.figure(figsize=(19.20,10.80))
layout = g.layout("fr")
graph = ig.plot(g, layout=layout, bbox=(900, 900), vertex_size = 11)
graph.save("enzyme.jpg")
graph.show()
```
![jpg](/post/notebook/enzyme.jpg)

### Analysing the ecoli graph


```python
E = g.ecount()
V = g.vcount()
g.summary()
# output means:
# D = directed graph
# N = names are defined
# W = weigthed graph
# - =
# number of vertices = 424
# number of edges = 577
```




    'IGRAPH DNW- 424 577 -- \n+ attr: name (v), color (e), weight (e)'




```python
self_a = [np.diff(e.tuple) == 0 and e["weight"] == 1.0 for e in g.es]
self_r = [np.diff(e.tuple) == 0 and e["weight"] == 2.0 for e in g.es]
self_u = [np.diff(e.tuple) == 0 and e["weight"] == 3.0 for e in g.es]

# Calculating numer of true entries in arrays
sum(self_a)
```




    array([14])



#### Number of FFL


```python
Edges = np.array([e.tuple for e in g.es])
d = 0

# Preparing for plot
for e in g.es:
    e["color"] = "black"
for v in g.vs:
    v["color"] = "red"

for a in Edges:
    for b in Edges:
        for c in Edges:
            if a[0] == b[0] and np.array_equal([b[1], a[1]], c):
                if np.array_equal(a, b) or np.array_equal(
                        a, c) or np.array_equal(b, c):
                    d = d
                else:
                    d += 1
                    for e in g.es:
                        if np.array_equal(e.tuple, b) or np.array_equal(
                                e.tuple, c) or np.array_equal(e.tuple, a):
                            e["color"] = "blue"
                    for v in g.es:
                        if v in b or v in a or v in c:
                                v["color"] = "blue"

print("The number of FFL's is " + str(d))
```

    The number of FFL's is 40



```python
# Plotting the graph
layout = g.layout("fr")
graph = ig.plot(g, layout=layout, bbox=(900, 900), vertex_size = 11)
graph.save("enzyme_FFL.jpg")
```
![jpg](/post/notebook/enzyme_FFL.jpg)

#### Analysing a random generated graph


```python
# Generate a random graph using erdos renyi game:
# all graphs with a set number of edges and vertices are equally likely

# Generate n random graphs and find mean number of loops
n = 2
loops = np.zeros(n)
FFL = []
for i in range(1, n):
    rnd = ig.Graph.Erdos_Renyi(V, m=E, directed=True, loops=True)
    layout = rnd.layout("fr")
    graph = ig.plot(rnd, layout=layout,bbox = (1000, 1000), vertex_size = 13)
    graph.save("rnd.jpg")

    # Calculating the number of loops

    self = [np.diff(e.tuple) == 0 for e in rnd.es]
    loops[i] = (loops[i - 1] * i + sum(self)) / (i + 1)

     Calculating the number of FFL
    Edges = np.array([e.tuple for e in rnd.es])
    d = 0
    for a in Edges:
        for b in Edges:
            for c in Edges:
                if a[0] == b[0] and np.array_equal([b[1], a[1]], c):
                    if np.array_equal(a, b) or np.array_equal(
                            a, c) or np.array_equal(b, c):
                       d = d
                    else:
                        d += 1
    FFL.append(d)
```
![jpg](/post/notebook/rnd1.jpg)

```python
fig, axs = plt.subplots(1, 1, figsize=(15, 6))
plt.scatter(np.arange(n), loops, label="Simulated average")
plt.axhline(y=E / V,
            color='r',
            linestyle='-',
            label='Theoretical average, N = ' + str(1.36))
plt.title('average number of selfregulating nodes  in random network', size=20)
plt.grid(
    True,
    linestyle='--',
    alpha=0.7,
)
plt.legend(loc=7, prop={'size': 8.5})
plt.xlabel('Number of random graphs', size=17)
plt.ylabel('$N_{self}$', size=17)
plt.show()
```


![png](/post/notebook/output_30_0.png)



```python
# Calculating the average number of FFL
average = [np.average(FFL[:i + 1]) for i in range(np.size(FFL))]

fig, axs = plt.subplots(1, 1, figsize=(15, 6))
plt.scatter(np.arange(n - 1), average, label="Simulated average")
plt.axhline(y=2.5,
            color='r',
            linestyle='-',
            label='Theoretical average, N = ' + str(1.36))
plt.title('average number of FFL\'s  in a random network', size=20)
plt.grid(
    True,
    linestyle='--',
    alpha=0.7,
)
plt.legend(loc=7, prop={'size': 8.5})
plt.xlabel('Number of random graphs', size=17)
plt.ylabel('$N_{FFL}$', size=17)
plt.show()
```


![png](/post/notebook/output_31_0.png)



```python
Edges = np.array([e.tuple for e in rnd.es])
d = 0
for a in Edges:
    for b in Edges:
        for c in Edges:
            if a[0] == b[0] and np.array_equal([b[1], a[1]], c):
                if np.array_equal(a, b) or np.array_equal(
                        a, c) or np.array_equal(b, c):
                    d = d
                else:
                    d += 1
print("The number of FFL's is " + str(d))
```

    The number of FFL's is 5


## Problem 4.2


```python
import numpy as np
import matplotlib.pyplot as plt

dt = 10**-3
a = 1
b = 1
k = 1 / 4
T = 10**4

X = np.zeros(T)
X[0] = 10**-3
Y = np.zeros(T)
Y[0] = 10**-3


def f(x):
    return (b * x) / (x + k) - a * x


def g(x):
    return b - a * x


for i in range(1, T):
    X[i] = X[i - 1] + f(np.float(X[i - 1])) * dt
    Y[i] = Y[i - 1] + g(np.float(Y[i - 1])) * dt

fig, axs = plt.subplots(1, 1, figsize=(11, 7))
x = np.linspace(0, T * dt, T)
plt.plot(x, X, label='Positively autoregulated')
plt.plot(x, Y, label='non-regulated')

plt.axhline(y=3 / 8, xmin=0, xmax=0.31, color='r', linestyle='--')
plt.axvline(x=2.9, ymin=0, ymax=0.385, color='r', linestyle='--')

plt.axhline(y=0.5, xmin=0, xmax=0.11, color='r', linestyle='--')
plt.axvline(x=0.7, ymin=0, ymax=0.5, color='r', linestyle='--')

plt.title('Solution of the Positively autoregulated protein vs non-regulated',
          size=18)
plt.grid(True, linestyle='--', alpha=0.7)
plt.legend(loc=7, prop={'size': 12})
plt.xlabel('Time')
plt.ylabel('N')
plt.show()
```


![png](/post/notebook/output_34_0.png)


# Problem set 4


## problem 4.4


```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import odeint
from plotdf import plotdf



def f(x, t):
    k = 1
    return np.array([k/(x[1]**2 + k) - x[0], k/(x[0]**2 + k) - x[1]])

t = 0
y1 = np.linspace(-2.5, 2.5, 22)
y2 = np.linspace(-2.5, 2.5, 22)
Y1, Y2 = np.meshgrid(y1, y2)
u, v = np.zeros(Y1.shape), np.zeros(Y2.shape)

NI, NJ = Y1.shape
for i in range(NI):
    for j in range(NJ):
        x = Y1[i, j]
        y = Y2[i, j]
        yprime = f(np.array([x, y]), t)
        u[i,j] = yprime[0]
        v[i,j] = yprime[1]
    
# Plotting        
fig, axs = plt.subplots(1, 1, figsize=(9, 7))
# Phase portrait
Q = plt.quiver(Y1, Y2, u, v, color='black',units='xy', pivot='tip', width=0.02, scale= 10 )
#Calculating phase space 

x = np.random.uniform(-8,8,40)
y1 = np.sqrt(64-x[20:]**2)
y2 = -np.sqrt(64-x[:20]**2)
y = np.concatenate((y1,y2))
tuples= np.concatenate((np.column_stack([y[:10],x[30:]]),np.column_stack([x[30:],y[:10]]),np.column_stack([y[30:],x[:10]]),np.column_stack([x[30:],y[:10]])))

for y0 in  tuples:
    tspan = np.linspace(0, 50, 2000)
    ys = odeint(f, y0, tspan)
    plt.plot(ys[:,0], ys[:,1], 'r-') # path
    
plt.xlabel('$r$',size=20)
plt.ylabel('$s$',size=20)
plt.xlim([-2.5, 2.5])
plt.ylim([-2.5, 2.5])
plt.title('Phase portrait of the Genetic Toggle Switch',size=15)
plt.show()
```


![png](/post/notebook/output_37_0.png)


## problem 5.1



```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import odeint
from plotdf import plotdf



def f(x, t):
    a = 1
    b = 3
    return np.array([a + x[0]**2 * x[1] - (b+1)*x[0], b * x[0] - x[0]**2 * x[1]])

t = 0
y1 = np.linspace(0, 5.5, 10)
y2 = np.linspace(0, 5.5, 10)
Y1, Y2 = np.meshgrid(y1, y2)
u, v = np.zeros(Y1.shape), np.zeros(Y2.shape)

NI, NJ = Y1.shape
for i in range(NI):
    for j in range(NJ):
        x = Y1[i, j]
        y = Y2[i, j]
        yprime = f(np.array([x, y]), t)
        u[i,j] = yprime[0]
        v[i,j] = yprime[1]
    
# Plotting        
fig, axs = plt.subplots(1, 1, figsize=(9, 7))

# Phase portrait
Q = plt.quiver(Y1, Y2, u, v, color='black', pivot='tip', width=0.005 , scale =300)
1
#Calculating phase space
y0 = [2,2]
tspan = np.linspace(0, 50, 8000)
ys = odeint(f, y0, tspan)
plt.plot(ys[:,0], ys[:,1], 'r-') # path
plt.grid(True, linestyle='--', alpha=0.7)
plt.xlabel('$x$', size=20)
plt.ylabel('$y$', size=20)
plt.xlim([0, 3.8])
plt.ylim([0, 5.5])
plt.title('Phase portrait and limit cycle solution of the Brusselator',size=15)
plt.show()
```


![png](/post/notebook/output_39_0.png)



```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib
matplotlib.rcParams['text.usetex'] = True


def f(x, a, b):
    return -(a - (b + 1) * x) / x**2


def g(x, b):
    return b / x


fig, ax = plt.subplots(1, 1, figsize=(11, 7))

x = np.linspace(0.01, 9, 1000)
a = [0,2,4]

for i in a:
    plt.plot(x, f(x, i, 1), label='1') 
plt.plot(x, g(x, 1), label='1')

textstr = '\n'.join((r'$\diamond\,\, y=\frac{a-(b+1)x}{x^2}$', r'$\ast\,\, y=\frac{b}{x}$'))
ax.text(0.05,
        0.95,
        textstr,
        transform=ax.transAxes,
        fontsize=14,
        verticalalignment='top',
        size=20)

plt.title('')
plt.grid(True, linestyle='--', alpha=0.7)
plt.legend(loc=7, prop={'size': 8.5})
plt.xlabel('x')
plt.ylabel('y')
plt.ylim(-10, 20)
plt.xlim(0, 9)
plt.show()
```


![png](/post/notebook/output_40_0.png)

