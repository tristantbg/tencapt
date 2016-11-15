<?php snippet('header') ?>

<?php 
$cropperGallery = $page->croppergallery()->toStructure();
$images = array();
?>

<div id="tencapture-cropper">
	<div class="controls">
		<span id="percent">0%</span>
		<input id="range" type="range" class="image-zoom-input" value="0" min="0" max="1" step=".25"/>
	</div>
	<div class="cropit-preview"></div>
	<div class="image-info">
	<span class="image-number">01/<?= sprintf("%02d", $cropperGallery->count()) ?></span>
	<span class="image-caption"></span>
	</div>

<?php 
if ($cropperGallery->isNotEmpty()):
	foreach($cropperGallery as $key => $image):
		$url = (string)$image->content()->toFile()->url();
	    $caption = (string)$image->caption()->html();
		$imageContent = array( 'image' => $url, 'caption' => $caption );
		array_push($images, $imageContent);
?>

<noscript>
	<img src="<?= $url ?>" alt="<?= $caption ?>" />
</noscript>

<?php endforeach ?>
<?php endif ?>

<script>
	var $cropperImages = <?= json_encode($images) ?>;
</script>

</div>

<div id="sections">

  <section id="about">
  	<?= $page->text()->kt() ?>
  </section>

<?php foreach($page->sections()->toStructure() as $section): ?>
  <?php snippet('sections/' . $section->_fieldset(), array('data' => $section)) ?>
<?php endforeach ?>

</div>

<?php snippet('footer') ?>