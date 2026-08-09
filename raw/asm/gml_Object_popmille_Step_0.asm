// gml_Object_popmille_Step_0  locals=1 args=0 len=132
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.global.v global.sca
00000018: push.d 0.5
00000024: mul.d.v
00000028: push.global.v global.sca
00000030: push.d 0.5
0000003C: mul.d.v
00000040: call action_sprite_transform(argc=4)
00000048: popz
0000004C: push.imm.e -1
00000050: push.imm.e 0
00000054: push.v obj0.view_hview[array]
0000005C: push.imm.e -1
00000060: push.imm.e 0
00000064: push.v obj0.view_yview[array]
0000006C: add.v.v
00000070: push.v obj628.x
00000078: call action_move_to(argc=2)
00000080: popz