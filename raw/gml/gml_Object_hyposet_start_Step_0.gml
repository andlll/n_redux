/// gml_Object_hyposet_start_Step_0
view_hview[0] = window_get_height();
view_wport[0] = window_get_width();
view_hport[0] = window_get_height();
view_wview[0] = window_get_width();
if (os_type == 4) {
    window_set_size(global.figx, global.figy);
}
if (os_type == 0) {
    ha1 = window_get_width();
    ha2 = window_get_height();
    surface_resize(application_surface, ha1, ha2);
}
