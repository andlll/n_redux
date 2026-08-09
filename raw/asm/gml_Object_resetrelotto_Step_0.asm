// gml_Object_resetrelotto_Step_0  locals=1 args=0 len=384
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.d 0.89
0000001C: push.global.v global.sca
00000024: mul.v.d
00000028: push.d 0.89
00000034: push.global.v global.sca
0000003C: mul.v.d
00000040: call action_sprite_transform(argc=4)
00000048: popz
0000004C: call window_get_width(argc=0)
00000054: pop.v.v proto1
0000005C: call window_get_height(argc=0)
00000064: pop.v.v proto2
0000006C: push.v proto1
00000074: push.v proto2
0000007C: cmp.v.v >
00000080: bf 0x20C2E3C
00000084: push.imm.e 1
00000088: pop.v.i ori
00000090: b 0x20C2E48
00000094: push.imm.e 0
00000098: pop.v.i ori
000000A0: push.v ori
000000A8: push.imm.e 0
000000AC: cmp.i.v ==
000000B0: bf 0x20C2EC4
000000B4: push.imm.e -1
000000B8: push.imm.e 0
000000BC: push.v obj0.view_wview[array]
000000C4: push.imm.e 2
000000C8: conv.i.d
000000CC: div.d.v
000000D0: push.imm.e -1
000000D4: push.imm.e 0
000000D8: push.v obj0.view_xview[array]
000000E0: add.v.v
000000E4: pop.v.v x
000000EC: push.imm.e -1
000000F0: push.imm.e 0
000000F4: push.v obj0.view_yview[array]
000000FC: push.imm.e 700
00000100: push.global.v global.sca
00000108: mul.v.i
0000010C: add.v.v
00000110: pop.v.v y
00000118: b 0x20C2F28
0000011C: push.imm.e -1
00000120: push.imm.e 0
00000124: push.v obj0.view_wview[array]
0000012C: push.imm.e 2
00000130: conv.i.d
00000134: div.d.v
00000138: push.imm.e -1
0000013C: push.imm.e 0
00000140: push.v obj0.view_xview[array]
00000148: add.v.v
0000014C: pop.v.v x
00000154: push.imm.e -1
00000158: push.imm.e 0
0000015C: push.v obj0.view_yview[array]
00000164: push.imm.e 420
00000168: push.global.v global.sca
00000170: mul.v.i
00000174: add.v.v
00000178: pop.v.v y