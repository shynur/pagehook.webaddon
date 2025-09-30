((auto-mode-alist . (("[~#]\\'" . (ignore t))
                     ("/.git/COMMIT_EDITMSG\\'" . diff-mode)
                     ("\\.ya?ml\\'" . yaml-ts-mode)
                     ("\\.json\\'" . js-json-mode)
                     ("\\.mjs\\'" . javascript-mode)))
 (nil . ((delete-trailing-whitespace . t)
         (eval . (when (derived-mode-p 'text-mode 'prog-mode 'conf-mode)
                   (add-hook 'before-save-hook
                             #'delete-trailing-whitespace
                             nil "local")))
         (delete-trailing-lines . t)
         (require-final-newline . t)
         (sentence-end-double-space . t)

         (eval . (when buffer-file-name
                   (when (string-match-p
                           "\\`\\(LICENSE\\|License\\|license\\|COPYING\\)\\'"
                           (file-name-base buffer-file-name))
                     (setq-local buffer-read-only t))))

         (eval . (line-number-mode -1))
         (mode . display-line-numbers)
         (mode . column-number)

         (project-vc-merge-submodules . nil)

         (treesit-font-lock-level . 4)))
 (makefile-mode . ((whitespace-style . (face tabs))
                   (mode . whitespace)))
 (js-json-mode . ((indent-tabs-mode . t)))
 (js-mode . ((indent-tabs-mode . nil)
	         (tab-width . 4)))
 (html-mode . ((indent-tabs-mode . t)
	           (tab-width . 2)))
 ("node_modules" . ((nil . ((eval . (when buffer-file-name
                              (setq-local buffer-read-only t)))))))
 (yaml-mode . ((indent-tabs-mode . nil)
               (tab-width . 2))))
