---
title: "Hello World!"
date: "2020-04-23T12:12:12-00:12"
author: "Jan Stevens"
comments: "true"
tags:
  [
    "Gnu / Linux",
    "Python",
    "Physics",
    "Science",
    "Computer science",
    "Data Sciense",
    "complex systems",
  ]
subtitle: "My First post.  Solely to test various features of the Hugo, the static site genertor."
feature: "posts/HelloWorld/convection.jpg"
caption: "Reference: [Gallery of fluid motion](https://gfm.aps.org/meetings/dfd-2017/59babd0cb8ac316d38841e58)"
---


<!-- Loading mathjax macro -->
<!-- Load mathjax -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-AMS_HTML"></script>
<!-- MathJax configuration -->
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
    tex2jax: {
        inlineMath: [ ['$','$'], ["\\(","\\)"] ],
        displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
        processEscapes: true,
        processEnvironments: true
    },
    // Center justify equations in code and markdown cells. Elsewhere
    // we use CSS to left justify single line equations in code cells.
    displayAlign: 'center',
    "HTML-CSS": {
        styles: {'.MathJax_Display': {"margin": 0}},
        linebreaks: { automatic: true }
    }
});
</script>
<!-- End of mathjax configuration -->

# Hello World

In this blog post various unrelated topics are discussed. I added these to test out some functionalities of Hugo and Markdown. I think it turned out quite nice. Note that I did not write this content myself, they are interesting things I remembered seeing online.

<style>
    simulation {
      position: absolute;
      text-align: center;
    }
</style>


## 1. Bash Bomb

The fork bomb is a form of denial-of-service (DoS) attack against a Linux or Unix-based system. Once a successful fork bomb has been activated in a system it may not be possible to resume normal operation without rebooting the system as the only solution to a fork bomb is to destroy all instances of it.

### Understanding the fork() bomb

<span style="color:red"> :() </span> – Defined the function called :. This function accepts no arguments. The syntax for bash function is as follows:

```bash
# function syntax
foo(){
 arg1=$1
 arg2=$2
 echo 'Bar..'
 #do_something on $arg argument
}
```

The fork() bomb is defined as follows:

```Bash
# Bash bomb
   :(){
    :|:&
    };:
```

<span style="color:red"> :|: </span> - Next it will call itself using programming technique called recursion and pipes the output to another call of the function ‘:’. The worst part is function get called two times to bomb your system.<br>

<span style="color:red"> & </span> - Puts the function call in the background so child cannot die at all and start eating system resources.<br>

<span style="color:red"> ; </span> - Terminate the function definition.<br>

<span style="color:red"> : </span> - Call (run) the function.

{{< alert message="Never run without a process limit." type="alert" badge="Warning" >}}

## 2. Lorenz Atractor

The lorenz attractor was first studied by Ed N. Lorenz, a meteorologist, around 1963. It was derived from a simplified model of convection in the earth's atmosphere. It also arises naturally in models of lasers and dynamos. The system is most commonly expressed as 3 coupled non-linear differential equations.

<center>
    $\frac{dx}{dt} = a (y - x) \\
    \frac{dy}{dt} = x (b - z) - y \\
    \frac{dx}{dt} = xy - c z$
</center>

One commonly used set of constants is a = 10, b = 28, c = 8 / 3. Another is a = 28, b = 46.92, c = 4. "a" is sometimes known as the Prandtl number and "b" the Rayleigh number.

The series does not form limit cycles nor does it ever reach a steady state. Instead it is an example of deterministic chaos. As with other chaotic systems the Lorenz system is sensitive to the initial conditions, two initial states no matter how close will diverge, usually sooner rather than later.

As an excercise I plotted the Lorenz attractor using Python. If you want to try it yourself, you can download the code here:

<center>
<br>
{{< button text="Download Ipynb" type="info" icon="download" href="notebook/LorenzAttractor.ipynb" >}}
</center>

```python
import numpy as np
import matplotlib.pyplot as plt

def lorenz(x, y, z, s=10, r=28, b=2.667):
    '''
    Given:
       x, y, z: a point of interest in three dimensional space
       s, r, b: parameters defining the lorenz attractor
    Returns:
       x_dot, y_dot, z_dot: values of the lorenz attractor's partial
           derivatives at the point x, y, z
    '''
    x_dot = s*(y - x)
    y_dot = r*x - y - x*z
    z_dot = x*y - b*z
    return x_dot, y_dot, z_dot


dt = 0.01
num_steps = 10000

# Need one more for the initial values
xs = np.empty(num_steps + 1)
ys = np.empty(num_steps + 1)
zs = np.empty(num_steps + 1)

# Set initial values
xs[0], ys[0], zs[0] = (0., 1., 1.05)

# Step through "time", calculating the partial derivatives at the current point
# and using them to estimate the next point
for i in range(num_steps):
    x_dot, y_dot, z_dot = lorenz(xs[i], ys[i], zs[i])
    xs[i + 1] = xs[i] + (x_dot * dt)
    ys[i + 1] = ys[i] + (y_dot * dt)
    zs[i + 1] = zs[i] + (z_dot * dt)


# Plot
fig = plt.figure(figsize=(15, 8.8))
ax = fig.gca(projection='3d')
ax.plot(xs, ys, zs, lw=0.6)
ax.set_xticks([])
ax.set_yticks([])
ax.set_zticks([])
ax.set_title("Lorenz Attractor", size="18", pad = "20")
plt.show()
```

{{< figure src="posts/HelloWorld/LorenzAttractor.jpg" caption="Reference" attrlink="https://matplotlib.org/3.1.0/gallery/mplot3d/lorenz_attractor.html" attr="matplotlib">}}
