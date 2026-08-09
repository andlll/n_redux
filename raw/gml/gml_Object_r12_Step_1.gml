/// gml_Object_r12_Step_1
if (os_is_paused()) {
    if (os_type == 4) {
        game_end();
    }
    if (os_type == 0) {
        instance_create(0, 0, pausania);
    }
}
