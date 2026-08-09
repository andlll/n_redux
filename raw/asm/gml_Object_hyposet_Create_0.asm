// gml_Object_hyposet_Create_0  locals=2 args=0 len=644
// locals: arguments, __b__
00000000: call display_get_width(argc=0)
00000008: pop.v.v global.figx
00000010: call display_get_height(argc=0)
00000018: pop.v.v global.figy
00000020: call window_get_width(argc=0)
00000028: pop.v.v proto1
00000030: call window_get_height(argc=0)
00000038: pop.v.v proto2
00000040: push.builtin.v os_type
00000048: push.imm.e 4
0000004C: cmp.i.v ==
00000050: bf 0x20BF324
00000054: push.v proto1
0000005C: push.v proto2
00000064: cmp.v.v >
00000068: bf 0x20BF318
0000006C: push.imm.e 0
00000070: pop.v.i global.upp
00000078: b 0x20BF324
0000007C: push.imm.e 40
00000080: pop.v.i global.upp
00000088: push.builtin.v os_type
00000090: push.imm.e 4
00000094: cmp.i.v ==
00000098: bf 0x20BF354
0000009C: push.global.v global.figy
000000A4: push.global.v global.figx
000000AC: call window_set_size(argc=2)
000000B4: popz
000000B8: push.imm.e 0
000000BC: conv.i.v
000000C0: push.imm.e 4
000000C4: conv.i.v
000000C8: push.builtin.v os_type
000000D0: call action_if_variable(argc=3)
000000D8: pop.v.v local.__b__
000000E0: push.local.v local.__b__
000000E8: conv.v.b
000000EC: bf 0x20BF3DC
000000F0: call window_get_width(argc=0)
000000F8: push.d 0.5
00000104: mul.d.v
00000108: push.imm.e -1
0000010C: push.imm.e 0
00000110: pop.v.v obj0.view_wview[array]
00000118: call window_get_height(argc=0)
00000120: push.d 0.5
0000012C: mul.d.v
00000130: push.imm.e -1
00000134: push.imm.e 0
00000138: pop.v.v obj0.view_hview[array]
00000140: push.imm.e 0
00000144: conv.i.v
00000148: push.imm.e 0
0000014C: conv.i.v
00000150: push.builtin.v os_type
00000158: call action_if_variable(argc=3)
00000160: pop.v.v local.__b__
00000168: push.local.v local.__b__
00000170: conv.v.b
00000174: bf 0x20BF468
00000178: push.imm.e 0
0000017C: conv.i.v
00000180: push.imm.e 1372
00000184: conv.i.v
00000188: call action_set_cursor(argc=2)
00000190: popz
00000194: call window_get_width(argc=0)
0000019C: push.imm.e -1
000001A0: push.imm.e 0
000001A4: pop.v.v obj0.view_wview[array]
000001AC: call window_get_height(argc=0)
000001B4: push.imm.e 40
000001B8: sub.i.v
000001BC: push.imm.e -1
000001C0: push.imm.e 0
000001C4: pop.v.v obj0.view_hview[array]
000001CC: call window_get_width(argc=0)
000001D4: push.imm.e -1
000001D8: push.imm.e 0
000001DC: pop.v.v obj0.view_wport[array]
000001E4: push.imm.e 0
000001E8: conv.i.v
000001EC: push.imm.e 4
000001F0: conv.i.v
000001F4: push.builtin.v os_type
000001FC: call action_if_variable(argc=3)
00000204: pop.v.v local.__b__
0000020C: push.local.v local.__b__
00000214: conv.v.b
00000218: bf 0x20BF4D0
0000021C: call window_get_height(argc=0)
00000224: push.imm.e -1
00000228: push.imm.e 0
0000022C: pop.v.v obj0.view_hport[array]
00000234: push.imm.e 0
00000238: conv.i.v
0000023C: push.imm.e 0
00000240: conv.i.v
00000244: push.builtin.v os_type
0000024C: call action_if_variable(argc=3)
00000254: pop.v.v local.__b__
0000025C: push.local.v local.__b__
00000264: conv.v.b
00000268: bf 0x20BF520
0000026C: call window_get_height(argc=0)
00000274: push.imm.e -1
00000278: push.imm.e 0
0000027C: pop.v.v obj0.view_hport[array]