---
---


# Table of Contents

1.  [Disclaimer](#org3302f9f)
2.  [Introduction](#orgf45322f)
3.  [Automating the full process](#orge44ab8f)
    1.  [Function to create the org-file](#org58282d2)
    2.  [Function to export and publish the org-file in markdown format](#org43dc512)


<a id="org3302f9f"></a>

# Disclaimer

I am still a noob at Emacs so do your research before incorporating my scripts in your config :)


<a id="orgf45322f"></a>

# Introduction

I started using org-mode for my everyday note taking, and I also have a blog where I like to share what I learn.
The Jekyll blog posts must be in the markdown format and we must add [YAML front matter](https://jekyllrb.com/docs/front-matter/) to the top of each 
post.

Org-mode has a great markdown exporter, so my workflow went like this -

1.  Name the file with a format of YYYY-MM-DD-Title.org
2.  Take notes in the org-file.
3.  Export the file to markdown using C-c C-e m m keystrokes.
4.  Add the YAML front matter to the top of it.
5.  Move the generated markdown file into the correct directory of my local github pages repo.
6.  Perform the following git operations -
    i.   git add filename
    
    ii.  git commit -m 'Added filename'
    
    iii. git push

And your blog will be published on the github pages. 


<a id="orge44ab8f"></a>

# Automating the full process

Thanks to the power and ease of elisp, we can perform all those operations in a couple of keystrokes.
Press f6, and an org-file will be created with the required format, press f7 and your blog will be published
to your website. Let's see how the elisp functions look like -


<a id="org58282d2"></a>

## Function to create the org-file

    (defun create-org-file (title)
      (interactive "sEnter title for post: ")
      (find-file (concat "~/" 
      (shell-command-to-string "echo -n $(date +%Y-%m-%d-)") title ".org"))
      )
    
    (global-set-key (kbd "<f6>") 'create-org-file)

We pass an argument to the function create-org-file called title, open a new file and add the current year,
month and date using the echo command and concatinate it with title and .org extension. Bind it with a 
keyboard shortcut of your choice.


<a id="org43dc512"></a>

## Function to export and publish the org-file in markdown format

      (defun publish-to-blog()
        (interactive)
        (save-buffer)
        (org-md-export-to-markdown)
        (shell-command (concat "echo -e '---\n---\n' | cat - " (file-name-base (buffer-file-name)) ".md 
    	> temp && mv temp " (file-name-base (buffer-file-name)) ".md"))
        (shell-command (concat "mv " (file-name-base (buffer-file-name)) ".md"
    			   " ~/Github/blog/_posts/"))
        (shell-command (concat "cd ~/Github/blog/_posts/ && git add . && 
        git commit -m 'Added file " (file-name-base (buffer-file-name)) ".md' && git push"))
        )
    
    (global-set-key (kbd "<f7>") 'publish-to-blog)

We first save the current buffer and call the org-export backend for markdown. This automatically adds a table
of contents for us.
The next task is to echo the YAML front matter. If you only add the front matter without any properties,
the blog will have the same title as the title of the file. 
Finally, call the shell command for git operations and bind the key to f7. In my case, git doesn't ask for
credentials since I have (not recommened at all) saved my user/key combination using git config.

The path written as "~/Github/blog/<sub>posts</sub>" should be replaced with the path where your github page posts
are stored.

