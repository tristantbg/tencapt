<?php if(!defined('KIRBY')) exit ?>

title: Page
pages: true
files:
  fields:
    focus:
      label: Center crop
      type: focus
fields:
  title:
    label: Title
    type:  text
  cropperSettings:
    label: Cropper settings
    type: headline
  croppergallery:
    label: Cropper images
    type: builder
    fieldsets:
      image:
        label: Image
        entry: >
               <table style="width:100%; font-size: 11px">
               <tr>
               <td style="width:20%">Image</td>
               <td>Caption</td>
               </tr>
               <tr>
               <td style="width:20%"><img src="{{_thumb}}" width="80px"><br>{{content}}</td>
               <td>{{caption}}</td>
               </tr>
               </table>
        fields:
          content:
            label: Image
            type: image
          caption:
            label: Caption
            type: textarea
  textSettings:
    label: Text content
    type: headline
  text:
    label: Text
    type:  textarea
  sections:
    label: Sections
    type: builder
    fieldsets:
      textsection:
        label: Text section
        snippet: sections/textsection
        fields:
          sectiontitle:
            label: Title
            type: text
          text:
            label: Text
            type: textarea