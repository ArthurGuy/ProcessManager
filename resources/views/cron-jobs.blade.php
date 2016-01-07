@extends('layouts.app')

@section('content')
	<div class="container-fluid">
		<div class="col-sm-12">

			<div class="card">
				<div class="card-header">
					Add a cron Job
				</div>
				<div class="card-block">

					<div class="card-text">
						<!-- Display Validation Errors -->
						@include('common.errors')

						<!-- New Task Form -->
						<form action="/cron" method="POST">
							{{ csrf_field() }}

							<!-- Task Name -->
							<div class="form-group row">
								<label for="cron-name" class="col-sm-3 form-control-label">Name</label>
								<div class="col-sm-9">
									<input type="text" name="name" id="cron-name" class="form-control" value="{{ old('cron') }}">
								</div>
							</div>

							<div class="form-group row">
								<label for="cron-command" class="col-sm-3 form-control-label">Command</label>
								<div class="col-sm-9">
									<input type="text" name="command" id="cron-command" class="form-control" value="{{ old('cron') }}">
								</div>
							</div>

							<div class="form-group row">
								<label for="cron-execute_frequency" class="col-sm-3 form-control-label">Frequency</label>
								<div class="col-sm-9">
									<select name="execute_frequency" id="cron-execute_frequency" class="form-control c-select">
										<option value="minute">Minute</option>
										<option value="hour" selected>Hour</option>
										<option value="day">Day</option>
									</select>
								</div>
							</div>

							<!-- Add Task Button -->
							<fieldset class="form-group">
								<div class="col-sm-offset-3">
									<button type="submit" class="btn btn-primary">Add Cron Job</button>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</div>

			<!-- Current Tasks -->
			@if (count($cronJobs) > 0)
				<div class="card">
					<div class="card-header">
						Current Cron Jobs
					</div>

					<div class="card-text">
						<table class="table table-striped task-table">
							<thead>
								<th>Task</th>
								<th>&nbsp;</th>
							</thead>
							<tbody>
								@foreach ($cronJobs as $cronJob)
									<tr>
										<td class="table-text"><div>{{ $cronJob->name }}</div></td>

										<!-- Task Delete Button -->
										<td>
											<form action="/cron/{{ $cronJob->id }}" method="POST">
												{{ csrf_field() }}
												{{ method_field('DELETE') }}

												<button type="submit" class="btn btn-danger">
													<i class="fa fa-trash"></i>Delete
												</button>
											</form>
										</td>
									</tr>
								@endforeach
							</tbody>
						</table>
					</div>
				</div>
			@endif
		</div>
	</div>
@endsection
