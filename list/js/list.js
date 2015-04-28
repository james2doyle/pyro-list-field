(function($){
  $.fn.extend( {
    /*
     *      The listfield jquery plugin
     *      Add new list item to the front end, to serialize them in backend and save them.
     */
    listfield: function( options ) {
      this.defaults = {
        addLabel: "+",
        removeLabel: "-",
        rowClass: ""
      };
      var settings = $.extend( {}, this.defaults, options );


    /*
     *    the template of one item row.
     */
    function makeTemplate(name) {
        return '<li><textarea type="text" name="'+name+'" class="item_input '+settings.rowClass+'"></textarea><div class="btn gray add">'+settings.addLabel+'</div><div class="btn gray remove">'+settings.removeLabel+'</div></li>';
    }

    /*
     *    removeItem
     */    
    function removeItem() {
        var $parent = $(this).parent().parent();
        if ($parent.children('li').length > 1) {
          // remove the li item
          $(this).parent().remove();
        }
    }


    /*
     *    addItem
     */  
    function addItem(callback) {
        var $parent = $(this).parent().parent(),
          count = $parent.children('li').length,
          newname = $parent.attr('id')+'['+count+']',
          $previousTextarea = $(this).siblings('textarea');

        if ($previousTextarea.val() !== '') {
          var str = makeTemplate(newname);
          $parent.append(str);

        } else {
          alert('No Value');//todo change that to inline alert no popup.
          return false;
        }
    }

    /*
    *    Add new list item when user press enter.
    */
    function textareaEnter($parent, callback) {
        var count = $parent.children('li').length,
            newname = $parent.attr('id')+'['+count+']',
            str = makeTemplate(newname);

        $parent.append(str);
        if (callback && typeof(callback) === "function") {
          callback(newname);
        }
    }

    /*
    *    Handle key pressing
    *   
    */
    function textareaHandle(e) {
        var $parent = $(this).parent().parent(),
            code = (e.keyCode ? e.keyCode : e.which);

        if(code === 13) {
            e.preventDefault();
        if ($(this).val() !== '') {
            textareaEnter($parent, function(name) {
              $('textarea[name="'+name+'"]')[0].focus();
            });
        } else {
            alert('No value.');
            return false;
        }
            return false;
        }
    }

      return this.each( function() {
        var $this = $(this);
        $this.on('click', '.add', addItem);
        $this.on('click', '.remove', removeItem);
        $this.on('keypress', 'textarea', textareaHandle);
      });
    }
  });
})( jQuery );