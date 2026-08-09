// gml_Object_hyposet_start_Create_0  locals=2 args=0 len=652
// locals: arguments, __b__
00000000: call display_get_width(argc=0)
00000008: pop.v.v global.figx
00000010: call display_get_height(argc=0)
00000018: pop.v.v global.figy
00000020: push.imm.e 0
00000024: conv.i.v
00000028: push.imm.e 0
0000002C: conv.i.v
00000030: push.builtin.v os_type
00000038: call action_if_variable(argc=3)
00000040: pop.v.v local.__b__
00000048: push.local.v local.__b__
00000050: conv.v.b
00000054: bf 0x20BF8D0
00000058: push.imm.e 1040
0000005C: conv.i.v
00000060: push.imm.e 1920
00000064: conv.i.v
00000068: call window_set_size(argc=2)
00000070: popz
00000074: call window_get_width(argc=0)
0000007C: pop.v.v ha1
00000084: call window_get_height(argc=0)
0000008C: pop.v.v ha2
00000094: push.v ha2
0000009C: push.v ha1
000000A4: push.builtin.v application_surface
000000AC: call surface_resize(argc=3)
000000B4: popz
000000B8: push.builtin.v os_type
000000C0: push.imm.e 4
000000C4: cmp.i.v ==
000000C8: bf 0x20BF900
000000CC: push.global.v global.figy
000000D4: push.global.v global.figx
000000DC: call window_set_size(argc=2)
000000E4: popz
000000E8: push.global.v global.figy
000000F0: push.global.v global.figx
000000F8: push.builtin.v application_surface
00000100: call surface_resize(argc=3)
00000108: popz
0000010C: call window_get_width(argc=0)
00000114: push.imm.e -1
00000118: push.imm.e 0
0000011C: pop.v.v obj0.view_wview[array]
00000124: push.imm.e 0
00000128: conv.i.v
0000012C: push.imm.e 4
00000130: conv.i.v
00000134: push.builtin.v os_type
0000013C: call action_if_variable(argc=3)
00000144: pop.v.v local.__b__
0000014C: push.local.v local.__b__
00000154: conv.v.b
00000158: bf 0x20BF98C
0000015C: call window_get_height(argc=0)
00000164: push.imm.e -1
00000168: push.imm.e 0
0000016C: pop.v.v obj0.view_hview[array]
00000174: push.imm.e 0
00000178: conv.i.v
0000017C: push.imm.e 0
00000180: conv.i.v
00000184: push.builtin.v os_type
0000018C: call action_if_variable(argc=3)
00000194: pop.v.v local.__b__
0000019C: push.local.v local.__b__
000001A4: conv.v.b
000001A8: bf 0x20BF9E4
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
00000218: bf 0x20BFA4C
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
00000268: bf 0x20BFAA4
0000026C: call window_get_height(argc=0)
00000274: push.imm.e 40
00000278: sub.i.v
0000027C: push.imm.e -1
00000280: push.imm.e 0
00000284: pop.v.v obj0.view_hport[array]