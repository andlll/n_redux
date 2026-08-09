/// gml_Script_script0
// locals: test_w, test_h
TestMode = 0;
test_w = 1920;
test_h = 1080;
if (TestMode == 0) {
    display_w = round(window_get_width());
    display_h = round(window_get_height());
    display_aspect_ratio = display_w / display_h;
} else {
    display_w = test_w;
    display_h = test_h;
    display_aspect_ratio = display_h / display_w;
}
view_hview[0] = view_wview[0] / display_aspect_ratio;
view_hport[0] = view_wview[0] / display_aspect_ratio;
display_set_gui_size(view_wport[0], view_hport[0]);
surface_resize(application_surface, view_wview[0], view_hview[0]);
