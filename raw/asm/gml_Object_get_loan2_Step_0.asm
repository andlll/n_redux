// gml_Object_get_loan2_Step_0  locals=1 args=0 len=104
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.global.v global.sca
00000018: push.d 0.89
00000024: mul.d.v
00000028: push.global.v global.sca
00000030: push.d 0.89
0000003C: mul.d.v
00000040: call action_sprite_transform(argc=4)
00000048: popz
0000004C: push.v obj150.y
00000054: push.v obj150.x
0000005C: call action_move_to(argc=2)
00000064: popz