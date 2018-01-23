$(document).ready(function() {

  //    NOTES    //
  var notes = [];

  function displayNotes() {

    $('#notes').empty();

    if (notes.length > 0) {
      var i;
      for (i = 0; i < notes.length; i++) {
        var currentNote = notes[i];
        addExistingNote(i, currentNote.color, currentNote.text);
      }
    }
  }
  // Prepend a note
  function addExistingNote(i, color, text) {
    $('#notes').prepend(
      '<article class="note new-note bg-' + color + '" data-count="' + i + '">' +
      '<div class="note-content">' +
      '<textarea class="new-note-text" readonly>' + text + '</textarea>' +
      '</div>' +
      '<div class="button-group inactive">' +
      '<div class="button-container">' +
      '<button class="edit txt-btn">EDIT</button>' +
      '<button class="delete">×</button>' +
      '</div>' +
      '</div>' +
      '<div class="button-group active">' +
      '<button class="txt-btn save">Save</button>' +
      '</div>' +
      '</article>'
    );

    var thisnote = $('#notes').find('.note:first');

    // save button
    thisnote.find('.save').click(function() {

      var editText = thisnote.find('textarea').val();
      var editColor = color;

      if (editColor != '') {
        notes.splice(i, 1, { color: editColor, text: editText });
      }

      displayNotes();
    });

    //edit button
    thisnote.find('.edit').click(function() {
      thisnote.addClass('in-edit');

      thisnote.find('input[type="radio"]:checked').val();
      thisnote.find('textarea').removeAttr('readOnly');
    });



    // delete option
    thisnote.find('.delete').click(function() {
      notes.splice(i, 1);
      displayNotes();
    });
  }


  function addNewNote(newNoteColor, newNoteText) {
    $('#new-note textarea').val('');
    notes.push({ color: newNoteColor, text: newNoteText });
    displayNotes();
  }

  // save a new note
  function saveNote() {
    var newNoteColor = $('#new-note input[type="radio"]:checked').val();
    var newNoteText = $('#new-note textarea').val();
    if (newNoteText != '') {
      addNewNote(newNoteColor, newNoteText);
    } else {
      alert('Please add some text to this note');
    }
  }

  displayNotes();

  $('#new-note .save').click(function() {
    saveNote();
  });

  //Modal
  tab = $('.tabs h3 a');

  tab.on('click', function(event) {
    event.preventDefault();
    tab.removeClass('act');
    $(this).addClass('act');

    tab_content = $(this).attr('href');
    $('div[id$="tab-content"]').removeClass('act');
    $(tab_content).addClass('act');
  });

});
