// gml_Object_easma_Step_0  locals=1 args=0 len=364
// locals: arguments
00000000: call window_get_width(argc=0)
00000008: pop.v.v proto1
00000010: call window_get_height(argc=0)
00000018: pop.v.v proto2
00000020: push.builtin.v os_type
00000028: push.imm.e 4
0000002C: cmp.i.v ==
00000030: bf 0x21ECD64
00000034: push.v proto2
0000003C: push.v proto1
00000044: cmp.v.v <
00000048: bf 0x21ECD20
0000004C: push.imm.e -1
00000050: push.imm.e 0
00000054: push.v obj0.view_xview[array]
0000005C: push.imm.e -1
00000060: push.imm.e 0
00000064: push.v obj0.view_wview[array]
0000006C: push.imm.e 2
00000070: conv.i.d
00000074: div.d.v
00000078: add.v.v
0000007C: push.imm.e 275
00000080: add.i.v
00000084: pop.v.v x
0000008C: push.imm.e -1
00000090: push.imm.e 0
00000094: push.v obj0.view_yview[array]
0000009C: push.imm.e -1
000000A0: push.imm.e 0
000000A4: push.v obj0.view_hview[array]
000000AC: push.imm.e 2
000000B0: conv.i.d
000000B4: div.d.v
000000B8: add.v.v
000000BC: push.imm.e 120
000000C0: add.i.v
000000C4: pop.v.v y
000000CC: b 0x21ECD64
000000D0: push.imm.e -1
000000D4: push.imm.e 0
000000D8: push.v obj0.view_xview[array]
000000E0: push.imm.e -1
000000E4: push.imm.e 0
000000E8: push.v obj0.view_wview[array]
000000F0: push.imm.e 2
000000F4: conv.i.d
000000F8: div.d.v
000000FC: add.v.v
00000100: pop.v.v x
00000108: push.imm.e 543
0000010C: pop.v.i y
00000114: push.builtin.v os_type
0000011C: push.imm.e 0
00000120: cmp.i.v ==
00000124: bf 0x21ECDBC
00000128: push.imm.e -1
0000012C: push.imm.e 0
00000130: push.v obj0.view_xview[array]
00000138: push.imm.e -1
0000013C: push.imm.e 0
00000140: push.v obj0.view_wview[array]
00000148: push.imm.e 2
0000014C: conv.i.d
00000150: div.d.v
00000154: add.v.v
00000158: pop.v.v x
00000160: push.imm.e 543
00000164: pop.v.i y