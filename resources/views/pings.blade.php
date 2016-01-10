@extends('layouts.app')

@section('content')
	<div class="container-fluid" id="pings">

		<h1>Pings</h1>

		<div class="card">
			<div class="card-block">
				<h3 class="card-title">Filtering</h3>
				<div class="card-text">
					<p v-show="filterTag">
						Filtering by: @{{ filterTag }}
						<button v-on:click="filterByTag('')" type="button" class="btn btn-sm btn-info">Clear</button>
					</p>

					<span v-for="tag in tags">
						<button v-on:click="filterByTag(tag)" type="button" class="btn btn-sm btn-info">@{{ tag }}</button>
					</span>

				</div>
			</div>
		</div>

		<div class="alert alert-danger" role="alert" v-if="alerts">
			<strong>Alert</strong> There are problems, please review the checks below
		</div>

		<div class="card">

			<div class="card-text">
				<table class="table table-sm">
					<thead>
						<th>Status</th>
						<th>Name</th>
						<th>Description</th>
						<th>Tags</th>
						<th>Last Update</th>
						<th>&nbsp;</th>
					</thead>
					<tbody>
						<tr v-for="(pingIndex, ping) in pings | tagFilter filterTag">
							<td class="table-text">
								<span v-if="!ping.active" class="btn btn-secondary btn-sm">
									<span title="Disabled" class="octicon octicon-circle-slash"></span>
								</span>
								<span v-if="ping.error && ping.active" class="btn btn-danger btn-sm">
									<span title="Error" class="octicon octicon-alert"></span>
								</span>
								<span v-if="!ping.error && ping.active" class="btn btn-success btn-sm">
									<span title="Error" class="octicon octicon-thumbsup"></span>
								</span>
							</td>
							<td>
								<div v-show="!ping.edit">
									@{{ ping.name }}
								</div>
								<div v-show="ping.edit">
									<input type="text" class="form-control" name="name" v-model="ping.name">
								</div>
							</td>
							<td>
								<div v-show="!ping.edit">
									@{{ ping.description }}
								</div>
								<div v-show="ping.edit">
									<input type="text" class="form-control" name="description" v-model="ping.description">
								</div>
							</td>
							<td>
								<div v-show="!ping.edit">
									@{{ ping.tags }}
								</div>
								<div v-show="ping.edit">
									<input type="text" class="form-control" name="tags" v-model="ping.tags">
								</div>
							</td>
							<td>
								<div v-show="!ping.edit">
									@{{ ping.last_ping | timeAgo }}<br />
									<small>@{{ ping.last_ping | simpleDate }}</small>
								</div>
								<div v-show="ping.edit">
									<div class="form-inline">
									<input type="text" class="form-control" name="frequency_value" v-model="ping.frequency_value">
									<select class="form-control" name="frequency" v-model="ping.frequency">
										<option>minute</option>
										<option>hour</option>
										<option>day</option>
										<option>week</option>
										<option>month</option>
									</select>
									</div>
								</div>
							</td>
							<td>
								<div v-show="!ping.edit">
									<button v-on:click="editMode(ping, pingIndex, true)" class="btn btn-default btn-sm">
										<span title="Edit" class="octicon octicon-pencil"></span>
									</button>
									Fix this, cant use index with filtered lists
									<button v-on:click="deletePing(pingIndex)" class="btn btn-danger btn-sm">
										<span title="Delete" class="octicon octicon-trashcan"></span>
									</button>
								</div>
								<div v-show="ping.edit">
									<button v-on:click="savePing(pingIndex)" class="btn btn-success btn-sm">
										<span title="Save" class="octicon octicon-check"></span>
									</button>
									<button v-on:click="editMode(ping, pingIndex, false)" class="btn btn-default btn-sm">
										<span title="Cancel" class="octicon octicon-circle-slash"></span>
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="card-footer text-muted">
				{{ \App\Ping::baseUrl() }}/[ping-name]
			</div>
		</div>


		<div class="card">
			<div class="card-header">
				Add a new ping
			</div>
			<div class="card-block">

				<div class="card-text">
					<!-- Display Validation Errors -->
					@include('common.errors')

					<form action="/pings" method="POST">
						{{ csrf_field() }}

						<div class="form-group row">
							<label for="cron-name" class="col-sm-3 form-control-label">Name</label>
							<div class="col-sm-9">
								<input type="text" name="name" id="cron-name" class="form-control" value="{{ old('cron') }}">
							</div>
						</div>

						<fieldset class="form-group">
							<div class="col-sm-offset-3">
								<button type="submit" class="btn btn-primary">Add Ping</button>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
@endsection
