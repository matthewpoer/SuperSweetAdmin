<?php /* Smarty version 2.6.11, created on 2011-04-18 14:59:45
         compiled from themes/Sugar5/tpls/footer.tpl */ ?>
<!--end body panes-->
        </td></tr></table>
    </div>
    <div class="clear"></div>
</div>
<div id="bottomLinks">
<?php if ($this->_tpl_vars['AUTHENTICATED']):  echo $this->_tpl_vars['BOTTOMLINKS']; ?>

<?php endif; ?>
</div>
<div id="footer">
    <?php echo $this->_tpl_vars['STATISTICS']; ?>

    <div id="copyright">
        <?php echo $this->_tpl_vars['COPYRIGHT']; ?>

    </div>
</div>

</body>
</html>