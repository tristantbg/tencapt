<?php snippet('header') ?>

<?php 
$cropperGallery = $page->croppergallery()->toStructure();
$images = array();
?>

<div id="scan-cropper">
	<div class="controls">
		<span id="percent">0%</span>
		<input id="range" type="range" class="image-zoom-input" value="0" min="0" max="1" step=".25"/>
	</div>
	<div id="preview" class="zoom-1x"></div>
	<div class="image-info">
	<span class="image-number">01/<?= sprintf("%02d", $cropperGallery->count()) ?></span>
	<span class="image-caption"></span>
	</div>

<?php 
if ($cropperGallery->isNotEmpty()):
	foreach($cropperGallery as $key => $crop):
		$image = $crop->content()->toFile();
		$imageWidth = $image->width();
		$caption = $crop->caption()->escape();
		$imageContent = new stdClass();
		$imageContent->image = (string)resizeOnDemand($image, 1000);
		$imageContent->caption = (string)$caption;
	for ($i=1; $i < 6; $i++) {
		$url = (string)$image->focusCrop($i, 1000)->url();
		$imageContent->{'image_'.$i.'x'} = $url;
	}
	array_push($images, (array)$imageContent);
?>

<noscript>
	<img src="<?= resizeOnDemand($image, 3000); ?>" alt="<?= $caption ?>" />
</noscript>

<?php endforeach ?>
<?php endif ?>

<script>
	var $cropperImages = <?= json_encode($images) ?>;
</script>

</div>

<div id="sections">

  <section id="<?= tagslug(l::get('about')) ?>">
  	<?= $page->text()->kt() ?>
  </section>

<?php foreach($page->sections()->toStructure() as $section): ?>
  <?php snippet('sections/' . $section->_fieldset(), array('data' => $section)) ?>
<?php endforeach ?>

<footer>
	<?= $site->footer()->kt() ?>
</footer>

</div>

<?php snippet('footer') ?>