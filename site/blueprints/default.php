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
               <td>Zoom 1</td>
               <td>Zoom 2</td>
               <td>Zoom 3</td>
               <td>Zoom 4</td>
               <td>Zoom 5</td>
               <td>Zoom 6</td>
               </tr>
               <tr>
               <td style="width:20%"><img src="{{_thumb}}" width="80px"><br>{{content}}</td>
               <td>{{caption}}</td>
               <td>{{zoom1}}</td>
               <td>{{zoom2}}</td>
               <td>{{zoom3}}</td>
               <td>{{zoom4}}</td>
               <td>{{zoom5}}</td>
               <td>{{zoom6}}</td>
               </tr>
               </table>
        fields:
          content:
            label: Full image
            type: image
            width: 1/2
          download:
            label: HD file to download
            type: select
            options: files
            width: 1/2
          zoom1:
            label: Zoom 1
            type: image
            width: 1/2
          zoom2:
            label: Zoom 2
            type: image
            width: 1/2
          zoom3:
            label: Zoom 3
            type: image
            width: 1/2
          zoom4:
            label: Zoom 4
            type: image
            width: 1/2
          zoom5:
            label: Zoom 5
            type: image
            width: 1/2
          zoom6:
            label: Zoom 6
            type: image
            width: 1/2
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