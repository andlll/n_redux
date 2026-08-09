// gml_Object_resetbuttone_Step_0  locals=1 args=0 len=404
// locals: arguments
00000000: call window_get_width(argc=0)
00000008: pop.v.v proto1
00000010: call window_get_height(argc=0)
00000018: pop.v.v proto2
00000020: push.v proto1
00000028: push.v proto2
00000030: cmp.v.v >
00000034: bf 0x20C2BFC
00000038: push.imm.e 1
0000003C: pop.v.i ori
00000044: b 0x20C2C08
00000048: push.imm.e 0
0000004C: pop.v.i ori
00000054: push.v ori
0000005C: push.imm.e 0
00000060: cmp.i.v ==
00000064: bf 0x20C2C84
00000068: push.imm.e -1
0000006C: push.imm.e 0
00000070: push.v obj0.view_wview[array]
00000078: push.imm.e 2
0000007C: conv.i.d
00000080: div.d.v
00000084: push.imm.e -1
00000088: push.imm.e 0
0000008C: push.v obj0.view_xview[array]
00000094: add.v.v
00000098: pop.v.v x
000000A0: push.imm.e -1
000000A4: push.imm.e 0
000000A8: push.v obj0.view_yview[array]
000000B0: push.imm.e 528
000000B4: push.global.v global.sca
000000BC: mul.v.i
000000C0: add.v.v
000000C4: pop.v.v y
000000CC: b 0x20C2CFC
000000D0: push.imm.e -1
000000D4: push.imm.e 0
000000D8: push.v obj0.view_wview[array]
000000E0: push.imm.e 2
000000E4: conv.i.d
000000E8: div.d.v
000000EC: push.imm.e -1
000000F0: push.imm.e 0
000000F4: push.v obj0.view_xview[array]
000000FC: add.v.v
00000100: push.imm.e 300
00000104: push.global.v global.sca
0000010C: mul.v.i
00000110: sub.v.v
00000114: pop.v.v x
0000011C: push.imm.e -1
00000120: push.imm.e 0
00000124: push.v obj0.view_yview[array]
0000012C: push.imm.e 420
00000130: push.global.v global.sca
00000138: mul.v.i
0000013C: add.v.v
00000140: pop.v.v y
00000148: push.imm.e 0
0000014C: conv.i.v
00000150: push.imm.e 0
00000154: conv.i.v
00000158: push.d 0.89
00000164: push.global.v global.sca
0000016C: mul.v.d
00000170: push.d 0.89
0000017C: push.global.v global.sca
00000184: mul.v.d
00000188: call action_sprite_transform(argc=4)
00000190: popz