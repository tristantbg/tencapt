<section id="<?= tagslug($data->sectiontitle()->html()) ?>">
  <div class="section-title">
  	<span class="outline">
  		<?= $data->sectiontitle()->html() ?>
  	</span>
  </div>
  <div class="section-content">
  	<?= $data->text()->kt() ?>
  </div>
</section>