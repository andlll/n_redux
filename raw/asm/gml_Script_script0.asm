// gml_Script_script0  locals=3 args=0 len=380
// locals: arguments, test_w, test_h
00000000: push.imm.e 0
00000004: pop.v.i TestMode
0000000C: push.imm.e 1920
00000010: pop.v.i local.test_w
00000018: push.imm.e 1080
0000001C: pop.v.i local.test_h
00000024: push.v TestMode
0000002C: push.imm.e 0
00000030: cmp.i.v ==
00000034: bf 0x209A330
00000038: call window_get_width(argc=0)
00000040: call round(argc=1)
00000048: pop.v.v display_w
00000050: call window_get_height(argc=0)
00000058: call round(argc=1)
00000060: pop.v.v display_h
00000068: push.v display_w
00000070: push.v display_h
00000078: div.v.v
0000007C: pop.v.v display_aspect_ratio
00000084: b 0x209A36C
00000088: push.local.v local.test_w
00000090: pop.v.v display_w
00000098: push.local.v local.test_h
000000A0: pop.v.v display_h
000000A8: push.v display_h
000000B0: push.v display_w
000000B8: div.v.v
000000BC: pop.v.v display_aspect_ratio
000000C4: push.imm.e -1
000000C8: push.imm.e 0
000000CC: push.v obj0.view_wview[array]
000000D4: push.v display_aspect_ratio
000000DC: div.v.v
000000E0: push.imm.e -1
000000E4: push.imm.e 0
000000E8: pop.v.v obj0.view_hview[array]
000000F0: push.imm.e -1
000000F4: push.imm.e 0
000000F8: push.v obj0.view_wview[array]
00000100: push.v display_aspect_ratio
00000108: div.v.v
0000010C: push.imm.e -1
00000110: push.imm.e 0
00000114: pop.v.v obj0.view_hport[array]
0000011C: push.imm.e -1
00000120: push.imm.e 0
00000124: push.v obj0.view_hport[array]
0000012C: push.imm.e -1
00000130: push.imm.e 0
00000134: push.v obj0.view_wport[array]
0000013C: call display_set_gui_size(argc=2)
00000144: popz
00000148: push.imm.e -1
0000014C: push.imm.e 0
00000150: push.v obj0.view_hview[array]
00000158: push.imm.e -1
0000015C: push.imm.e 0
00000160: push.v obj0.view_wview[array]
00000168: push.builtin.v application_surface
00000170: call surface_resize(argc=3)
00000178: popz