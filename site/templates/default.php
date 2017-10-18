<?php snippet('header') ?>

<?php 
$cropperGallery = $page->croppergallery()->toStructure();
$images = array();
?>

<div id="scan-cropper">
	<div id="preview">
		<?php 
		if ($cropperGallery->isNotEmpty()):
			foreach($cropperGallery as $key => $crop):
						$image = $crop->content()->toFile();
						$full = resizeOnDemand($image, 1500);
						$imageWidth = $image->width();
						$caption = $crop->caption()->escape();
						$zoom = [];
						if ($crop->download()->isNotEmpty()) {
							$download = $crop->download()->toFile()->url();
						} else {
							$download = null;
						}
						if($crop->zoom1()->isNotEmpty()) { $zoom[0] = $crop->zoom1()->toFile()->url(); }
						if($crop->zoom2()->isNotEmpty()) { $zoom[1] = $crop->zoom2()->toFile()->url(); }
						if($crop->zoom3()->isNotEmpty()) { $zoom[2] = $crop->zoom3()->toFile()->url(); }
						if($crop->zoom4()->isNotEmpty()) { $zoom[3] = $crop->zoom4()->toFile()->url(); }
						if($crop->zoom5()->isNotEmpty()) { $zoom[4] = $crop->zoom5()->toFile()->url(); }
						if($crop->zoom6()->isNotEmpty()) { $zoom[5] = $crop->zoom6()->toFile()->url(); } ?>

				<div class="cell" data-flickity-bg-lazyload="<?= $full ?>" data-caption="<?= $caption ?>" data-number="<?= $key + 1 ?>" data-zoom="0" <?php if($download) { echo 'data-download="'. $download .'"'; } ?>">
					
				</div>
				<?php foreach ($zoom as $idx => $x):?>
					<div class="cell" data-caption="<?= $caption ?>" data-number="<?= $key + 1 ?>" data-zoom="<?= $idx + 1 ?>" <?php if($download) { echo 'data-download="'. $download .'"'; } ?>>
						<img data-flickity-lazyload="<?= $x ?>" alt="<?= $caption." - Zoom ".$key ?>" />
					</div>
				<?php endforeach ?>

				<noscript>
					<img src="<?= $full ?>" alt="<?= $caption ?>" />
				</noscript>

		<?php endforeach ?>
		<?php endif ?>
	</div>
	<div class="image-info">
	<span class="image-caption"><?= $cropperGallery->first()->caption()->escape() ?></span>
	<span class="download"<?php e(!$download, ' style="display: none;"') ?>><a href="#" target="_blank" rel="nofollow" download><?= l::get('download') ?></a></span>
	</div>
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