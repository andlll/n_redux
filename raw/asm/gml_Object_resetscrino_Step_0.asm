// gml_Object_resetscrino_Step_0  locals=1 args=0 len=88
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.global.v global.sca
00000018: push.global.v global.sca
00000020: call action_sprite_transform(argc=4)
00000028: popz
0000002C: push.imm.e -1
00000030: push.imm.e 0
00000034: push.v obj0.view_yview[array]
0000003C: push.imm.e -1
00000040: push.imm.e 0
00000044: push.v obj0.view_xview[array]
0000004C: call action_move_to(argc=2)
00000054: popz